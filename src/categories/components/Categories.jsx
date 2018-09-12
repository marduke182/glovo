import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import CategoryShape from '../libs/CategoryShape';
import './Categories.scss';

function preventDefault(e) {
  e.preventDefault();
}

export default function Categories({ categories }) {

  return (
    <div className="Categories Categories--4">
      { categories.map(category => (
        <Link
          key={category.id}
          to={`/category/${category.name}`}
          className={classnames('Category', {
            isDisabled: category.sleepy
          })}
          onClick={category.sleepy && preventDefault}
        >
          <img className="Category-image" src={category.openIcon} alt={category.name} />
        </Link>

      ))}
    </div>
  )
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(CategoryShape).isRequired,
};
