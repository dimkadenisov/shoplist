import React, {useState} from 'react';

import "./App.css";

import AppHeader from '../AppHeader';
import TodoList from '../TodoList';
import SearchPanel from '../SearchPanel';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddForm from '../ItemAddForm';
import SortBlock from '../SortBlock';

export default function App() {

  let maxId = 100;

  const [todoData, setTodoData] = useState([
    createTodoItem('Milk', 100),
    createTodoItem('Bread', 200),
    createTodoItem('Butter', 300)
  ]);

  const [term, setTerm] = useState('');

  const [filter, setFilter] = useState('all');

  const [sort, setSort] = useState('');

  function createTodoItem(label, price) {
    return {
      label,
      price,
      important: false,
      done: false,
      id: maxId++
    }
  };

  function deleteItem(id) {
    setTodoData((todoData) => {
      const index = todoData.findIndex((el) => id === el.id);

      const newArray = [
        ...todoData.slice(0, index),
        ...todoData.slice(index + 1)
      ];

      return newArray
    });
  };

  function addItem(inputText, price) {
    if (inputText === "" || price === "") {
      alert("Заполните все поля");
      return false;
    };

    setTodoData((todoData) => {
      const newItem = createTodoItem(inputText, price);

      const newArray = [
        ...todoData,
        newItem
      ]

      return newArray;
    });

    return true;
  };

  function toggleProperty(array, id, propName) {
    const index = array.findIndex((el) => id === el.id);

    const oldItem = array[index];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    return [
      ...array.slice(0, index),
      newItem,
      ...array.slice(index + 1)
    ];
  };

  function onToggleDone(id) {
    setTodoData(todoData => toggleProperty(todoData, id, 'done'));
  };

  function onToggleImportant(id) {
    setTodoData(todoData => toggleProperty(todoData, id, 'important'));
  };

  function search (items, term) {
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  };

  function filterItems(items, filter) {
    switch(filter) {
      case 'all':
        return items

      case 'active':
        return items.filter((item) => !item.done);

      case 'done':
        return items.filter((item) => item.done);

      default:
        return items;
    }
  };

  function sortItems(items, value) {
    switch(value) {
      case 'alphabet':
        return items.sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));

      case 'price low':
        return items.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));

      case 'price high':
          return items.sort((a, b) => (b.price > a.price) ? 1 : ((a.price > b.price) ? -1 : 0));

      default:
        return items;
    }
  };

  const visibleItems = sortItems(filterItems(search(todoData, term), filter), sort);

  const doneCount = todoData.filter((el) => el.done).length;
  const todoCount = todoData.length - doneCount;

  return (
    <div className = "todo-app">
      <AppHeader toDo = { todoCount } done = { doneCount } />
      <div className = "top-panel d-flex">
        <SearchPanel onSearchChange={ setTerm }/>
        <ItemStatusFilter
          filter = { filter }
          onFilterChange = { setFilter } />
        <SortBlock onSortChange = { setSort }/>
      </div>

      <TodoList
        todos = { visibleItems }
        onDeleted = { deleteItem }
        onToggleImportant = { onToggleImportant }
        onToggleDone = { onToggleDone }
        />

      <ItemAddForm onItemAdded = { addItem }/>
    </div>
  );
};
