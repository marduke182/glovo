import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CategoryShape from '../libs/CategoryShape';
import './Categories.scss';

export default function Categories({ categories }) {
  return (
    <div className="Categories Categories--4">
      { categories.map(category => (
        <Link key={category.id} to={`/category/${category.name}`} className="Category">
          <img className="Category-image" src={category.openIcon} alt={category.name} />
        </Link>

      ))}
    </div>
  )
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(CategoryShape).isRequired,
};
