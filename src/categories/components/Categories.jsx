import React from 'react';
import PropTypes from 'prop-types';

export default function Categories({ categories }) {
  return (
    <React.Fragment>
      { categories.map(category => <div key={category.id}>{category.name}</div>)}
    </React.Fragment>
  )
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};
