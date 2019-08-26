import React from 'react';
import TodoListItem from '../TodoListItem';

import './TodoList.css';

export default function TodoList({
  todos,
  onDeleted,
  onToggleImportant,
  onToggleDone
}) {

  const elements = todos.map((item) => {

    const { id, ...itemProps } = item;

    return (
      <li key = { id } className="list-group-item">
        <TodoListItem
          { ...itemProps }
          onDeleted={ () => onDeleted(id) } //опять вонючие стрелки, которые убивают оптимизацию
          onToggleImportant={ () => onToggleImportant(id) } //опять вонючие стрелки, которые убивают оптимизацию
          onToggleDone={ () => onToggleDone(id) } //опять вонючие стрелки, которые убивают оптимизацию
          />
      </li>
    )
  });

  return (
    <ul className = "list-group todo-list">
      { elements }
    </ul>
  );
};
