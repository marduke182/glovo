import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import mapProps from 'recompose/mapProps';
import compose from 'recompose/compose';

import Tags from '@/shared/components/Tags';
import Loading from '@/shared/components/Loading';
import Error from '@/shared/components/Error';

import StoreShape from '../libs/StoreShape';
import StoreList from '../components/StoreList';
import { actions, selectors } from '../stores.redux';

export class StoresPage extends PureComponent {
  state = {
    tag: ''
  };

  handleTagChange = tag => {
    this.setState(() => ({
      tag
    }));
  };

  async componentDidMount() {
    this.props.getStoresOf(this.props.category);
  }

  render() {
    const { loading, error, stores, tags, tag, changeTag } = this.props;

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <Error />;
    }

    return (
      <React.Fragment>
        <Tags tags={tags} onChange={changeTag} value={tag} />
        <StoreList stores={stores} />
      </React.Fragment>
    );
  }
}

StoresPage.propTypes = {
  category: PropTypes.string.isRequired,
  getStoresOf: PropTypes.func.isRequired,
  changeTag: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  stores: PropTypes.arrayOf(StoreShape),
  tags: PropTypes.arrayOf(PropTypes.string)
};

const makeMapStateToProps = () => {
  const stores = selectors.makeStoresByCategory();
  const tags = selectors.makeTagsByCategory();
  return createStructuredSelector({
    loading: selectors.loading,
    error: selectors.error,
    tag: selectors.tag,
    stores,
    tags
  });
};

const connectToStore = connect(
  makeMapStateToProps,
  {
    getStoresOf: actions.getStoresOf,
    changeTag: actions.changeTag
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
