
async function getPokemonById(id, callbackFn) {
  return fetch(`http://localhost:8000/pokemon/${id}`)
    .then(r => r.json())
    .then(pkmn => callbackFn(pkmn));
}

export { getPokemonById };