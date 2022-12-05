const api = "http://localhost:8000/teams";

/**
 *
 * @param {Number} teamID
 * @param {String array} currentTeam
 * @param {Object} pokemonObject
 */
function postPokemon(teamID, currentTeam, pokemonObject, callbackFn) {
  fetch(`${api}/${teamID}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pokemon: [...currentTeam, pokemonObject],
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (callbackFn) callBackFn(data);
    });
}

export { postPokemon };
