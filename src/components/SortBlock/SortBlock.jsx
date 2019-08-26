import React, { useCallback } from 'react';
import './SortBlock.css'

export default function SortBlock({ onSortChange }) {

  const onChange = useCallback(e => onSortChange(e.target.value), [onSortChange]) //думаю зря тут передается массив с onSortChange

  return (
    <div className="sort-block">
    <select
      onChange={ onChange }
      className="custom-select">
      <option defaultValue >Sort by...</option>
      <option value = "alphabet">alphabet</option>
      <option value = "price low">price ↓</option>
      <option value = "price high">price ↑</option>
    </select>
    </div>
  );
};
