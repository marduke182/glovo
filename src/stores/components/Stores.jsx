import React from 'react';
import PropTypes from 'prop-types';

export default function Stores({ stores }) {
  return (
    <React.Fragment>
      {stores.map(store => (<div key={store.id}>{store.name}</div>))}
    </React.Fragment>
  )
}

Stores.propTypes = {
  stores: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
  }))
};
