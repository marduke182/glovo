import React from 'react';

export default function({ match }) {
  return <div>Stores in {match.params.category} Page</div>;
}
