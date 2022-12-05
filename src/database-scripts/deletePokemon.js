const api = "http://localhost:8000/teams";

/**
 * 
 * @param {Number} teamID 
 * @param {String array} currentTeam 
 * @param {Number} pokemonIndex 
 * @param {function} callbackFn 
 */
function deletePokemon(teamID, currentTeam, pokemonIndex, callbackFn) {
  const filterTeam = () => {
    return (
      currentTeam.slice(0, pokemonIndex).concat(currentTeam.slice(pokemonIndex + 1))
    );
  };

  fetch(`${api}/${teamID}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pokemon: filterTeam(),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (callbackFn) callbackFn(data);
    });
}

export { deletePokemon };
