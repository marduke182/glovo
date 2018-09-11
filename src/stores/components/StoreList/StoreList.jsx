import React from 'react';
import PropTypes from 'prop-types';

import StoreItem from './StoreItem';
import StoreShape from '@/stores/libs/StoreShape';

import './StoreList.scss';

export default function StoreList({ stores }) {
  return (
    <div className="StoreList">
      {stores.map(store => (<StoreItem key={store.id} {...store} />))}
    </div>
  )
}

StoreList.propTypes = {
  stores: PropTypes.arrayOf(StoreShape)
};
