import React from 'react';

import './ItemStatusFilter.css';

export default function ItemStatusFilter({ filter, onFilterChange }) {

  const buttons = [
    {name: 'all', label: 'All'},
    {name: 'active', label: 'Active'},
    {name: 'done', label: 'Done'},
  ];

  const buttonsNodes = buttons.map(({name, label}) => {
    const isActive = filter === name;
    const secondButtonClass = isActive ? 'btn-info' : 'btn-outline-secondary'
    return (
      <button
        type="button"
        className={`btn ${secondButtonClass}`}
        key={name}
        onClick={() => {onFilterChange(name)}}>
      {label}
      </button>
    )
  });
  return (
    <div className="btn-group">
      {buttonsNodes}
    </div>
  );
};
