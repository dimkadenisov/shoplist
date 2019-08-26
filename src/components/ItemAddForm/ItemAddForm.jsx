import React, {Component} from 'react';
import "./ItemAddForm.css";

export default class ItemAddForm extends Component {

  state = {
    label: '',
    price: ''
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    })
  }

  onPriceChange = (e) => {
    this.setState({
      price: e.target.value
    })
  }


  onSubmit = (e) => {
    e.preventDefault();
    if(this.props.onItemAdded(this.state.label, this.state.price)) {
      this.setState({
        label: '',
        price: ''
      });
    }
  }

  render() {
    return(
      <form className="d-flex add-item-form"
        onSubmit={this.onSubmit}
        >
        <input
          type="text"
          className="form-control new-item-text"
          onChange={this.onLabelChange}
          placeholder="What's need to be done"
          value={this.state.label}
          />
        <input
          type="number"
          className="form-control new-item-text"
          onChange={this.onPriceChange}
          placeholder="price"
          value={this.state.price}
          min="0"
          />
        <button
          className="btn btn-outline-secondary">
          Add Item
        </button>
      </form>
    )
  };
};
