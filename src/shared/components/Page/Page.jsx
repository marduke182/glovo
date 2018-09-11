import React from 'react';

import './Page.scss';

export default function({ children }) {
  return (
    <div className="Wrapper">
      {children}
    </div>
  )
}
