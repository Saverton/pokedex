import React from 'react';

function SearchForm({ searchTerm, setSearchTerm }) {
  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <form>
      <div className="form-group row">
        <label htmlFor="search" className="col-sm-2 col-form-label">Search :</label>
        <div className="col-sm-10">
        <input 
            type="text"
            className="form-control"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for Pokemon by name here."
          />
        </div>
      </div>
    </form>
  );
}

export default SearchForm;