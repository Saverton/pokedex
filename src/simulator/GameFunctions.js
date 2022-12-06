import { getPokemonById } from '../database-scripts/getPokemon';

function getRandomPokemonTeam(size) {
  const team = [];
  
  for (let i = 0; i < size; i++) {
    team.push(Math.floor(Math.random() * 151 + 1));
  }

  return team;
}

async function getPokemonFromIds(ids) {
  const pokemonTeam = [];

  for (let i = 0; i < ids.length; i++) {
    await getPokemonById(ids[i], (pkmn) => pokemonTeam.push(pkmn));
  }

  return pokemonTeam;
}

export { getRandomPokemonTeam, getPokemonFromIds };