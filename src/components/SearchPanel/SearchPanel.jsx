import React from 'react';

import './SearchPanel.css';

export default function SearchPanel({onSearchChange, term}) {

  return (
    <input
      type="text"
      className="form-control search-input"
      placeholder="type to search"
      value={term}
      onChange={e => onSearchChange(e.target.value)} />
  );
};
