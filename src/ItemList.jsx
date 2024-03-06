import React from 'react';
import LineItem from './LineItem';

const ItemList = ({ items, handleDelete, handleCheck }) => {
  const listItems = items.map((item) => (
    <LineItem
      key={item.id}
      item={item}
      handleDelete={handleDelete}
      handleCheck={handleCheck}
    />
  ));

  return <ul>{listItems}</ul>;
};

export default ItemList;
