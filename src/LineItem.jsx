import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
const LineItem = ({ item, handleDelete, handleCheck }) => {
  return (
    <li className="item">
      <input
        type="checkbox"
        onChange={() => handleCheck(item.id)}
        checked={item.checked}
        name={item.item}
        id={item.id}
      />
      <label
        onDoubleClick={() => handleCheck(item.id)}
        style={item.checked ? { textDecoration: 'line-through' } : null}
      >
        {item.item}
      </label>
      {/* <button>Delete</button> */}
      <FaTrashAlt
        onClick={() => handleDelete(item.id)}
        role="button"
        tabIndex="0"
      />
    </li>
  );
};

export default LineItem;
