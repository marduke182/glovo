import React, { PureComponent} from 'react';

import glovoClient from '@/shared/libs/glovoClient';
import Loading from '@/shared/components/Loading';
import Error from '@/shared/components/Error';

import Categories from '@/categories/components/Categories';

export default class CategoryPage extends PureComponent {
  state = {
    loading: true,
    error: null,
    categories: [],
  };

  async componentDidMount() {
    let { data, error } = await glovoClient.get('/categories');

    if (error) {
      return this.setState(() => ({ error, loading: false}));
    }

    return this.setState(() => ({ categories: data.categories, loading: false}));

  }

  render() {
    const { loading, error, categories } = this.state;
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

