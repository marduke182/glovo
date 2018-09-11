import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import mapProps from 'recompose/mapProps';
import compose from 'recompose/compose';

import Loading from '@/shared/components/Loading';
import Error from '@/shared/components/Error';

import StoreShape from '../libs/StoreShape';
import Stores from '../components/Stores';
import { actions, selectors } from '../stores.redux';

export class StoresPage extends PureComponent {
  async componentDidMount() {
    this.props.getStoresOf(this.props.category);
  }

  render() {
    const { loading, error, stores } = this.props;

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <Error />;
    }

    return <Stores stores={stores} />;
  }
}

StoresPage.propTypes = {
  category: PropTypes.string.isRequired,
  getStoresOf: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  stores: PropTypes.arrayOf(StoreShape)
};

const makeMapStateToProps = () => {
  const stores = selectors.makeStoresByCategory();
  return createStructuredSelector({
    loading: selectors.loading,
    error: selectors.error,
    stores
  });
};

const connectToStore = connect(
  makeMapStateToProps,
  {
    getStoresOf: actions.getStoresOf
  }
);

const mapCategoryReactRouter = mapProps(({ match, ...props }) => ({
  ...props,
  category: match.params.category
}));

export default compose(
  mapCategoryReactRouter,
  connectToStore
)(StoresPage);
