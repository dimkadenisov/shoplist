// import React, {Component} from 'react';

// import './SearchPanel.css';

// export default class SearchPanel extends Component {
//   state = {
//     term: ''
//   }

//   onSearchChange = (e) => {
//     const term = e.target.value;
//     this.setState({term});
//     this.props.onSearchChange(term);
//   }

//   render() {
//     return (
//       <input
//         type="text"
//         className="form-control search-input"
//         placeholder="type to search"
//         value={this.state.term}
//         onChange={this.onSearchChange} />
//     );
//   };
// };



import React, {useCallback} from 'react';

import './SearchPanel.css';

export default function SearchPanel({ term, onSearchChange }) {

  const onChange = useCallback((e) => onSearchChange(e.target.value), [onSearchChange]); //думаю зря тут передается массив с onSearchChange

  return (
    <input
      type = "text"
      className = "form-control search-input"
      placeholder = "type to search"
      value = { term }
      onChange = { onChange } />
  );
};
