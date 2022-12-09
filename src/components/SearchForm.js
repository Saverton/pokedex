import React from 'react';
import { SearchBar } from "../shared";
import { capitalizeEach } from '../helper/string_formatting';

const POKEMON_TYPES = [
  'bug', 'dragon', 'electric', 'fighting', 'fire', 'flying', 'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'water'
];

function SearchForm({ searchFilters, setSearchFilters }) {
  function handleFilterChange(e) {
    const { name, value } = e.target;
    setSearchFilters({
      ...searchFilters,
      [name]: value,
    });
  }

  const typeFilterOptions = POKEMON_TYPES.map(
    type => <option key={type} value={type}>{capitalizeEach(type)}</option>
  );

  return (
    <SearchBar>
      <div className="searchText">
        <label htmlFor="search"> 🔍 </label>
        <input 
          type="text"
          id="search"
          name="searchTerm"
          value={searchFilters.searchTerm}
          onChange={handleFilterChange}
          placeholder="Search for Pokemon by name here."
        />
      </div>
      <div className="searchDropdown">
        <label htmlFor="type-filter">Filter by Type: </label>
        <select id="type-filter" name="typeFilter" value={searchFilters.typeFilter} onChange={handleFilterChange}>
          <option value="all">All</option>/
          {typeFilterOptions}
        </select>
      </div>
    </SearchBar>
  );
}

export default SearchForm;