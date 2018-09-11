import React from 'react';

import './Tags.scss';

export default function Tags({ tags, value, onChange }) {
  if (value) {
    return (
      <div className="Tags">
        <div className="Tag" onClick={() => onChange('')}>
          {value}
          <span> ✖</span>
        </div>
      </div>
    );
  }

  return (
    <div className="Tags">
      {tags.map(tag => (
        <div className="Tag" key={tag} onClick={() => onChange(tag)}>
          {tag}
        </div>
      ))}
    </div>
  );
}
