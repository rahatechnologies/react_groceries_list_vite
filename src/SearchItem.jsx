import React from 'react';

const SearchItem = ({ searchItem, setSearchItem }) => {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search">Search</label>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search Items"
        role="searchBox"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />
    </form>
  );
};

export default SearchItem;
