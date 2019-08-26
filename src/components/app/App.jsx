import React, {Component} from 'react';

import "./App.css";

import AppHeader from '../AppHeader';
import TodoList from '../TodoList';
import SearchPanel from '../SearchPanel';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddForm from '../ItemAddForm';
import SortBlock from '../SortBlock';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Milk', 100),
      this.createTodoItem('Bread', 200),
      this.createTodoItem('Butter', 300)
    ],
    term: '',
    filter: 'all', //active/all/done
    sort: ''
  };

  createTodoItem(label, price) {
    return {
      label,
      price,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => id === el.id);

      const newArray = [
        ...todoData.slice(0, index),
        ...todoData.slice(index + 1)
      ];

      return {
        todoData: newArray
      };
    });
  };

  addItem = (inputText, price) => {
    if (inputText === "" || price === "") {
      alert("Заполните все поля");
      return false;
    };

    this.setState(({ todoData }) => {
      const newItem = this.createTodoItem(inputText, price);

      const newArray = [
        ...todoData,
        newItem
      ]

      return {
        todoData: newArray
      }
    });

    return true;
  };

  toggleProperty(array, id, propName) {
    const index = array.findIndex((el) => id === el.id);

      const oldItem = array[index];
      const newItem = {...oldItem, [propName]: !oldItem[propName]};

      return [
        ...array.slice(0, index),
        newItem,
        ...array.slice(index + 1)
      ];
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    });
  };

  onSearchChange = (term) => {
    this.setState({ term });
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  }

  search = (items, term) => {
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  filter(items, filter) {
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
  }

  onSortChange = (sort) => {
    this.setState({ sort });
  }

  sortItems(items, value) {
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
  }

  render() {

    const { todoData, term , filter, sort} = this.state;

    const visibleItems = this.sortItems(this.filter(this.search(todoData, term), filter), sort);

    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={ todoCount } done={ doneCount } />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange} />
          <SortBlock onSortChange ={this.onSortChange}/>
        </div>

        <TodoList
          todos = { visibleItems }
          onDeleted = { this.deleteItem }
          onToggleImportant = { this.onToggleImportant }
          onToggleDone = { this.onToggleDone }
          />

        <ItemAddForm onItemAdded={ this.addItem }/>
      </div>
    );
  };
};
