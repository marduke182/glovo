import React, { PureComponent} from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import Loading from '@/shared/components/Loading';
import Error from '@/shared/components/Error';

import Categories from '@/categories/components/Categories';
import CategoryShape from '../libs/CategoryShape';
import { selectors, actions } from '../categories.redux';

export class CategoriesPage extends PureComponent {
  componentDidMount() {
    return this.props.getCategoriesAndStores();
  }

  render() {
    const { loading, error, categories } = this.props;
    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <Error />;
    }

    return (
      <Categories categories={categories} />
    );
  }
}

CategoriesPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(CategoryShape),
  error: PropTypes.string,
  getCategoriesAndStores: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectors.loading,
  error: selectors.error,
  categories: selectors.categories,
});

const connectToStore = connect(mapStateToProps, {
  getCategoriesAndStores: actions.getCategoriesAndStores,
});


export default connectToStore(CategoriesPage);
