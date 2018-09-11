import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Categories.scss';

export default function Categories({ categories }) {
  return (
    <div className="Categories Categories--4">
      { categories.map(category => (
        <Link to={`/category/${category.name}`} className="Category">
          <img key={category.id} className="Category-image" src={category.openIcon} alt={category.name} />
        </Link>

      ))}
    </div>
  )
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    openIcon: PropTypes.string.isRequired,
    sleepIcon: PropTypes.string.isRequired,
  })).isRequired,
};
