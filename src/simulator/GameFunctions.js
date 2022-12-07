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

/**
 * Given an array of pokemon ids, returns an array of pokemon objects.
 * @param {Array} ids 
 * @returns {Array}
 */
async function getPokemonFromIds(ids) {
  const pokemonTeam = [];

  for (let i = 0; i < ids.length; i++) {
    await getPokemonById(ids[i], (pkmn) => pokemonTeam.push(pkmn));
  }

  return pokemonTeam;
}
export { getRandomPokemonTeam, getPokemonFromIds };

async function startNewSimulation(playerTeam, opponentName, setGameObj) {
  const player = {
    name: "Player",
    pokemon: [
      ...playerTeam
    ]
  };

  const opponentPokemon = await getPokemonFromIds(getRandomPokemonTeam(player.pokemon.length));
  const opponent = {
    name: opponentName,
    pokemon: opponentPokemon
  };

  const gameObj = new GameObject(player, opponent);

  runBattleIntro(gameObj, setGameObj);

  return gameObj;
}

function runBattleIntro(gameObj, setGameObj) {
  setTimeout(() => {
    // console.log('battle begins!');
    sendOutFirstOpponentPokemon(gameObj);
    setGameObj({...gameObj});
  }, 3000);

  setTimeout(() => {
    sendOutFirstPlayerPokemon(gameObj);
    setGameObj({...gameObj});
  }, 5000);

  setTimeout(() => {
    runBattleLoop(gameObj, setGameObj, 0);
  }, 7000)
}

function runBattleLoop(gameObj, setGameObj, turn) {
  gameObj.currentMessage = 'Now in game loop! turn : ' + turn;
  setGameObj({...gameObj});
  setTimeout(() => {
    if (turn > 10) {
      runBattleConclusion(gameObj, setGameObj);
    } else {
      runBattleLoop(gameObj, setGameObj, turn + 1);
    }
  }, 1000);
}

function runBattleConclusion(gameObj, setGameObj) {
  gameObj.currentMessage = 'The battle is over!';
  setGameObj({...gameObj});
}

function sendOutFirstOpponentPokemon(gameObj) {
  gameObj.currentMessage = gameObj.opponent.sendOutPokemon(0);
}

function sendOutFirstPlayerPokemon(gameObj) {
  gameObj.currentMessage = gameObj.player.sendOutPokemon(0);
}

export { startNewSimulation };