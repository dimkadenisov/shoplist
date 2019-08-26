import React, {useState, useCallback} from 'react';
import "./ItemAddForm.css";

export default function ItemAddForm({ onItemAdded }) {

  const [label, setLabel] = useState('');
  const [price, setPrice] = useState('');

  const onLabelChange = useCallback(e => setLabel(e.target.value), []);
  const onPriceChange = useCallback(e => setPrice(e.target.value), []);

  const onSubmit = useCallback(e => {
    e.preventDefault();
    if(onItemAdded(label, price)) {
      setLabel(''); // хук не на верхнем уровне
      setPrice(''); // хук не на верхнем уровне
    }
  }, [onItemAdded, label, price]); // реакт просит добавить этот массив

  return (
    <form className="d-flex add-item-form"
      onSubmit = { onSubmit }
      >
      <input
        type = "text"
        className = "form-control new-item-text"
        onChange = { onLabelChange }
        placeholder = "What's need to be done"
        value = { label }
        />
      <input
        type = "number"
        className = "form-control new-item-text"
        onChange = { onPriceChange }
        placeholder = "price"
        value = {price}
        min = "0"
        />
      <button
        className = "btn btn-outline-secondary">
        Add Item
      </button>
    </form>
  )
};
