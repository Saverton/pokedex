import { getPokemonById } from "../database-scripts/getPokemon";
import GameObject from "./GameObject";

function getRandomPokemonTeam(size) {
  const team = [];

  for (let i = 0; i < size; i++) {
    team.push(Math.floor(Math.random() * 151 + 1));
  }

  return team;
}

/**
 * Checks the player and opponent to see if they still have Pokemon to battle
 * @param {Object} game 
 * @returns -1 if opponent wins, 1 if player wins and 0 if no one wins
 */
function checkWinner(game) {
  if (!game.player.isAbleToBattle()) return -1;
  if (!game.opponent.isAbleToBattle()) return 1;
  
  return 0;
}

async function getPokemonFromIds(ids) {
  const pokemonTeam = [];

  for (let i = 0; i < ids.length; i++) {
    await getPokemonById(ids[i], (pkmn) => pokemonTeam.push(pkmn));
  }

  return pokemonTeam;
}
export { getRandomPokemonTeam, getPokemonFromIds };
