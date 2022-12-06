import React from 'react';

function SearchForm({ searchFilters, setSearchFilters }) {
  function handleFilterChange(e) {
    const { name, value } = e.target;
    setSearchFilters({
      ...searchFilters,
      [name]: value,
    });
  }

  return (
    <form>
      <div>
        <label htmlFor="search">Search :</label>
        <div>
        <input 
          type="text"
          id="search"
          name="searchTerm"
          value={searchFilters.searchTerm}
          onChange={handleFilterChange}
          placeholder="Seach for Pokemon by name here."
        />
        <label htmlFor="type-filter">Filter by Pokemon type : </label>
        <select id="type-filter" name="typeFilter" value={searchFilters.typeFilter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
        </select>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;