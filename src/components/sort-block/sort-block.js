import React from 'react';
import './sort-block.css'

const SortBlock = ({onSortChange}) => {

  return (
    <div className="sort-block">
    <select
      onChange={(e) => onSortChange(e.target.value)}
      className="custom-select">
      <option defaultValue >Sort by...</option>
      <option value="alphabet">alphabet</option>
      <option value="price low">price ↓</option>
      <option value="price high">price ↑</option>
    </select>
    </div>
  );
};

export default SortBlock;
