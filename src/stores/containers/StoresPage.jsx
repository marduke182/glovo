import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/fp/get';

import glovoClient from '@/shared/libs/glovoClient';
import Stores from '../components/Stores';

export default class StoresPage extends PureComponent {
  state = {
    loading: true,
    error: null,
    stores: [],
  };

  async componentDidMount() {
    const category = get('match.params.category', this.props);

    const { data, error } = await glovoClient.get(`stores?category=${category}`);

    if (error) {
      return this.setState(() => ({
        loading: false,
        error,
      }));
    }

    return this.setState(() => ({
      loading: false,
      stores: data.stores,
    }));
  }

  render() {
    const { loading, error, stores } = this.state;

    if (loading) {
      return <div>Loading</div>;
    }

    if (error) {
      return <div>Error</div>;
    }

    return <Stores stores={stores} />;
  }
}


StoresPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired
};
