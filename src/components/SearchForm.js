import React from 'react';
import { SearchBar } from "../shared";

function SearchForm({ searchFilters, setSearchFilters }) {
  function handleFilterChange(e) {
    const { name, value } = e.target;
    setSearchFilters({
      ...searchFilters,
      [name]: value,
    });
  }

  return (
    <SearchBar>
      <div className="search text">
        <label htmlFor="search">Search :</label>
        <input 
          type="text"
          id="search"
          name="searchTerm"
          value={searchFilters.searchTerm}
          onChange={handleFilterChange}
          placeholder="Search for Pokemon by name here."
        />
      </div>
      <div className="search dropdown">
        <label htmlFor="type-filter">Filter by Pokemon type : </label>
        <select id="type-filter" name="typeFilter" value={searchFilters.typeFilter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
        </select>
      </div>
    </SearchBar>
  );
}

export default SearchForm;