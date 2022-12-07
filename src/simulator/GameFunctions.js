import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";
import { getPokemonById } from "../database-scripts/getPokemon";
import GameObject from "./GameObject";
import Trainer from "./Trainer";

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
  }, 1000);

  setTimeout(() => {
    sendOutFirstPlayerPokemon(gameObj);
    setGameObj({...gameObj});
  }, 1000);

  setTimeout(() => {
    runBattleLoop(gameObj, setGameObj);
  }, 1000)
}

function runBattleLoop(gameObj, setGameObj) {
  playerActionMenu(gameObj);
  setGameObj({...gameObj});
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

/**
 * Changes the player's control menu options to the current Pokemon's moves
 * @param {Object} gameObj game object
 */
function playerFight(gameObj) {
  // test options before moves are implemented
  // console.log("FIGHT CHOSEN")
  const player = gameObj.player;

  const options = [
    {
      name: `move1`,
      callback: () => { 
        player.actionQueue = [() => console.log('move1')];
        return gameObj;
      }
    },
    {
      name: `move2`,
      callback: () => { 
        player.actionQueue = [() => console.log('move2')];
        return gameObj;
      }
    },
    {
      name: `move3`,
      callback: () => { 
        player.actionQueue = [() => console.log('move3')];
        return gameObj;
      }
    },
    {
      name: `move4`,
      callback: () => { 
        player.actionQueue = [() => console.log('move4')];
        return gameObj;
      }
    },
  ];

  options.push({
    name: "back",
    callback: () => playerActionMenu(gameObj)
  });

  gameObj.menuOptions = options;
  return gameObj;
}

/**
 * Updates player menu to show items in inventory. ** PLACEHOLDER UNTIL ITEMS IMPLEMENTED **
 * @param {Object} gameObj game object
 * @returns {string} message placeholder
 */
function playerItem(gameObj) {
  gameObj.currentMessage = `Clicking player item doesn't do anything yet!`;
  return gameObj;
}

/**
 * Updates the control menu to show the player's pokemon. Options will have an extra key 'disabled' that corresponds to the pokemon's 'isFainted()' method.
 * Pokemon who are fainted will not be able to be selected. A final option will be added, 'back', that will return the player to the action menu.
 * @param {Object} gameObj game object
 * @return {string} message : "which Pokemon would you like to send out?"
 */
function playerPokemon(gameObj) {
  const options = gameObj.player.pokemon.map(
    pkmn => ({
      name: pkmn.name,
      callback: () => console.log(pkmn.name, "switch!"), // add the pokemon switch method to the trainer's action queue 
      disabled: pkmn.isFainted(),
    })
  );

  options.push({
    name: "back",
    callback: () => playerActionMenu(gameObj)
  });

  gameObj.menuOptions = options;
  gameObj.currentMessage = 'Which Pokemon would you like to send out?';
  return gameObj;
}

/**
 * Sets the current game message to "You cannot run from a trainer battle!" and sets options to an OK button that sends the player to the main action menu.
 * @param {Object} gameObj game object
 * @param {function} setGameObj callback to set State
 */
function playerRun(gameObj) {
  gameObj.menuOptions = [{
    name: 'OK',
    callback: () => playerActionMenu(gameObj),
  }];
  gameObj.currentMessage = "You cannot run from a trainer battle!";
  return gameObj;
}

/**
 * Sets the game option menu to the four main player options, FIGHT, ITEM, POKEMON, and RUN. Updates message to be "What will <pokemon> do?".
 * @param {Object} gameObj game object
 */
function playerActionMenu(gameObj) {
  const options = [
    {
      name: "FIGHT",
      callback: () => {
        // console.log('FIGHT');
        return playerFight(gameObj);
      }
    },
    {
      name: "ITEM",
      callback: () => {
        return playerItem(gameObj);
      }
    },
    {
      name: "POKEMON",
      callback: () => {
        return playerPokemon(gameObj);
      }
    },
    {
      name: "RUN",
      callback: () => {
        return playerRun(gameObj);
      }
    }
  ];

  gameObj.menuOptions = options;
  gameObj.currentMessage = `What will ${gameObj.player.currentPokemon.name} do?`;
  return gameObj;
}

/**
 * Create a callback function for executing a pokemon's move on a target pokemon. The return function will run as a script, managing primary and secondary effects of the move.
 * @param {Object} gameObj game object
 */
function generatePokemonMoveFunction(pokemon, target, moveName) {
  const move = pokemon.moveSet[moveName];
  // display move text in message
  
  // execute primary functions

  // if has secondary effects
    // display secondary message

    // execute them
}

export { startNewSimulation };