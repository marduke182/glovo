import React, { PureComponent} from 'react';
import glovoClient from '@/shared/libs/glovoClient';

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
      return <div>loading</div>;
    }

    if (error) {
      return <div>{error.toString()}</div>;
    }

    return (
      <Categories categories={categories} />
    );
  }
}

