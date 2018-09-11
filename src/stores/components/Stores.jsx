import React from 'react';
import PropTypes from 'prop-types';

import StoreShape from '../libs/StoreShape';

export default function Stores({ stores }) {
  return (
    <React.Fragment>
      {stores.map(store => (<div key={store.id}>{store.name}</div>))}
    </React.Fragment>
  )
}

Stores.propTypes = {
  stores: PropTypes.arrayOf(StoreShape)
};
