import React from 'react';
import PropTypes from 'prop-types';

export default function Stores({ match }) {
  return <div>Stores in {match.params.category} Page</div>;
}

Stores.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired
};
