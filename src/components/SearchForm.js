import React from 'react';

function SearchForm({ searchTerm, setSearchTerm }) {
  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <div>
      <label htmlFor="search">Search : </label>
      <input 
        type="text" 
        id="search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default SearchForm;