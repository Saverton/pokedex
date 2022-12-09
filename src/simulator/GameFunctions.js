import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";
import { getPokemonById } from "../database-scripts/getPokemon";
import { getMoveById } from "../database-scripts/getMove";
import GameObject from "./GameObject";
import Trainer from "./Trainer";
import Action, { getActionFromPokemonSwitch } from './Action';
import Move from "./Move";

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
    pokemon: [...playerTeam],
  };

  const opponentPokemon = await getPokemonFromIds(
    getRandomPokemonTeam(player.pokemon.length)
  );
  const opponent = {
    name: opponentName,
    pokemon: opponentPokemon,
  };

  const gameObj = new GameObject(player, opponent);

  runBattleIntro(gameObj, setGameObj);

  return gameObj;
}

async function runBattleIntro(gameObj, setGameObj) {
  sendOutPokemon(gameObj, "opponent", 0, setGameObj); // await these to get timed animations
  sendOutPokemon(gameObj, "player", 0, setGameObj);

  setTimeout(() => {
    runBattleLoop(gameObj, setGameObj);
  }, 1000);
}

async function runBattleLoop(gameObj, setGameObj) {
  const { player, opponent } = gameObj;

  if (
    player.currentPokemon === undefined ||
    opponent.currentPokemon === undefined
  ) {
    const opponentNext = opponent.getFirstUnfaintedPokemon();
    if (player.currentPokemon === undefined) {
      // force choose new
      gameObj.currentMessage = "Which Pokemon should you send out next?";
      setGameObj({ ...gameObj });
      await playerSwitchToNewPokemon(gameObj, setGameObj).then((idx) =>
        sendOutPokemon(gameObj, "player", idx, setGameObj)
      );
      console.log("passed promise");
    } else {
      // ask if want to switch
      await showYesOrNoPrompt(
        gameObj,
        setGameObj,
        `${opponent.name} is about to send out ${opponent.pokemon[opponentNext].name}, would you like to switch?`
      ).then(async (res) => {
        if (res === "yes") {
          await playerSwitchToNewPokemon(gameObj, setGameObj).then((idx) =>
            sendOutPokemon(gameObj, "player", idx, setGameObj)
          );
        }
      });
    }
    await sendOutPokemon(gameObj, "opponent", opponentNext, setGameObj);
  }
  // opponent choose action
  if (gameObj.opponent.actionQueue.length === 0) {
    const opponentMove =
      gameObj.opponent.currentPokemon.moveSet[Math.floor(Math.random() * gameObj.opponent.currentPokemon.moveSet.length)];
    gameObj.opponent.actionQueue = [
      ...opponentMove.getMoveActions(gameObj.opponent.currentPokemon, gameObj.player.currentPokemon)
    ];
  }

  if (gameObj.player.actionQueue.length > 0) {
    runTrainerActions(gameObj, setGameObj);
  } else {
    playerActionMenu(gameObj, setGameObj);
  }
  setGameObj({ ...gameObj });
}

function runBattleConclusion(gameObj, setGameObj, winner) {
  gameObj.currentMessage = `The battle is over! ${winner}, wins!`;
  setGameObj({ ...gameObj });
}

async function sendOutPokemon(gameObj, trainer, index, setGameObj) {
  // console.log('sending out pokemon!');
  if (
    gameObj[trainer].currentPokemon &&
    gameObj[trainer].currentPokemon !== gameObj[trainer].pokemon[index]
  ) {
    // recall current Pokemon
    await recallPokemon(gameObj, trainer, setGameObj);
  }
  if (
    gameObj[trainer].currentPokemon === undefined ||
    gameObj[trainer].currentPokemon !== gameObj[trainer].pokemon[index]
  ) {
    gameObj.currentMessage = gameObj[trainer].sendOutPokemon(index);
    gameObj.playerControl = false;
    setGameObj({ ...gameObj });
    await new Promise((resolve) => {
      setTimeout(() => resolve(1), 1500);
    });
  }
}

/**
 * Recalls the current pokemon that is out, displaying a message and returning the currentPokemon to undefined.
 * @param {Object} gameObj
 * @param {string} trainer
 * @param {function} setGameObj
 */
async function recallPokemon(gameObj, trainer, setGameObj) {
  gameObj.currentMessage = gameObj[trainer].recallPokemon();
  setGameObj({ ...gameObj });
  await new Promise((resolve) => {
    setTimeout(() => resolve(1), 1500);
  });
}

/**
 * Changes the player's control menu options to the current Pokemon's moves
 * @param {Object} gameObj game object
 */
function playerFight(gameObj, setGameObj) {
  // test options before moves are implemented
  // console.log("FIGHT CHOSEN")
  const player = gameObj.player;

  const options = player.currentPokemon.moveSet.map((move) => ({
    name: <>{move.name} <br/> {"PP: " + move.currentPP} <br/>  {move.type}</>,
    callback: (setGameObj) => {
      player.actionQueue = [
        ...move.getMoveActions(player.currentPokemon, gameObj.opponent.currentPokemon)
      ];
      runTrainerActions(gameObj, setGameObj);
      return gameObj;
    },
  }));

  options.push({
    name: "back",
    callback: () => playerActionMenu(gameObj, setGameObj),
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
function playerPokemon(gameObj, setGameObj, showBackOption = true) {
  const options = gameObj.player.pokemon.map((pkmn, idx) => ({
    name: pkmn.name,
    callback: () => {
      gameObj.player.actionQueue.push(getActionFromPokemonSwitch(
        async () => {
          await sendOutPokemon(gameObj, "player", idx, setGameObj);
        },
        gameObj, setGameObj, idx
      )); 
      runTrainerActions(gameObj, setGameObj);
      gameObj.playerControl = false;
      return gameObj;
    }, // add the pokemon switch method to the trainer's action queue
    disabled: pkmn.isFainted() || pkmn === gameObj.player.currentPokemon,
  }));

  if (showBackOption) {
    options.push({
      name: "back",
      callback: () => playerActionMenu(gameObj, setGameObj),
    });
  }

  gameObj.menuOptions = options;
  gameObj.currentMessage = "Which Pokemon would you like to send out?";
  return gameObj;
}

/**
 * Sets the current game message to "You cannot run from a trainer battle!" and sets options to an OK button that sends the player to the main action menu.
 * @param {Object} gameObj game object
 * @param {function} setGameObj callback to set State
 */
function playerRun(gameObj, setGameObj) {
  gameObj.menuOptions = [
    {
      name: "OK",
      callback: () => playerActionMenu(gameObj, setGameObj),
    },
  ];
  gameObj.currentMessage = "You cannot run from a trainer battle!";
  return gameObj;
}

/**
 * Sets the game option menu to the four main player options, FIGHT, ITEM, POKEMON, and RUN. Updates message to be "What will <pokemon> do?".
 * @param {Object} gameObj game object
 */
function playerActionMenu(gameObj, setGameObj) {
  const options = [
    {
      name: "FIGHT",
      callback: () => {
        // console.log('FIGHT');
        return playerFight(gameObj, setGameObj);
      },
    },
    {
      name: "ITEM",
      callback: () => {
        return playerItem(gameObj);
      },
    },
    {
      name: "POKEMON",
      callback: () => {
        return playerPokemon(gameObj, setGameObj);
      },
    },
    {
      name: "RUN",
      callback: () => {
        return playerRun(gameObj, setGameObj);
      },
    },
  ];

  gameObj.menuOptions = options;
  gameObj.currentMessage = `What will ${gameObj.player.currentPokemon.name} do?`;
  return gameObj;
}



/**
 * Run the opponent and player moves as a script.
 * @param {Object} gameObj game object
 * @param {function} setGameObj function, updates react state
 */
async function runTrainerActions(gameObj, setGameObj) {
  // stop input
  gameObj.playerControl = false;
  const playerPokemon = gameObj.player.currentPokemon;
  const opponentPokemon = gameObj.opponent.currentPokemon;
  playerPokemon.resetTurnStats();
  opponentPokemon.resetTurnStats();
  console.log(playerPokemon.statusEffect);
  if (playerPokemon.statusEffect) {
    const effect = playerPokemon.statusEffect;
    if (effect.turn >= effect.duration) {
      await effectExpire(playerPokemon, gameObj, setGameObj);
    } else {
      effect.onBeforeTurn();
    }
  }
  if (opponentPokemon.statusEffect) {
    const effect = opponentPokemon.statusEffect;
    if (effect.turn >= effect.duration) {
      await effectExpire(opponentPokemon, gameObj, setGameObj);
    } else {
      effect.onBeforeTurn();
    }
  }
  setGameObj({ ...gameObj });

  // get move order array, i.e. ['player', 'opponent']
  const turnOrder = getTurnOrder(gameObj.player, gameObj.opponent);

  // perform the actions in order
  for (let i = 0; i < 2; i++) {
    await gameObj[turnOrder[i]].useTurn(gameObj, setGameObj);
    const breakFromTurn = await checkFainted(gameObj, setGameObj);
    if (breakFromTurn) {
      break;
    }
  }

  if (gameObj.player.currentPokemon && playerPokemon.statusEffect) {
    gameObj.currentMessage = playerPokemon.statusEffect.messages.duration(playerPokemon);
    playerPokemon.statusEffect.onAfterTurn();
    setGameObj({...gameObj});
    await wait(1.5);
  }
  if (gameObj.opponent.currentPokemon && opponentPokemon.statusEffect) {
    gameObj.currentMessage = opponentPokemon.statusEffect.messages.duration(opponentPokemon);
    opponentPokemon.statusEffect.onAfterTurn();
    setGameObj({...gameObj});
    await wait(1.5);
  }

  const winState = checkWinner(gameObj);
  if (winState !== 0) {
    // check if battle is over
    runBattleConclusion(
      gameObj,
      setGameObj,
      winState === 1 ? "player" : "opponent"
    );
  } else {
    runBattleLoop(gameObj, setGameObj);
  }
}

/**
 * Return an array of 4 move objects, chosen at random from the moves db.
 * @param {Object} pokemonObj the pokemon
 * @param {Object} dbObj the db pokemon object with moveIds
 * @return {Array} Array of move objects
 */
async function getMoves(pokemonObj, dbObj) {
  const moves = [];
  const movePool = [...dbObj.possibleMoves];

  for (let i = 0; i < 4; i++) {
    const moveIndex = Math.floor(Math.random() * movePool.length);
    const [ moveId ] = movePool.splice(moveIndex, 1);
    await getMoveById(moveId, (move) => moves.push(new Move(move)));
    if (movePool.length === 0) {
      break;
    }
  }

  pokemonObj.moveSet = moves;
}

/**
 * Execute a basic attack, taking pokemon base attack, attack power, and defending pokemon's defense into account for calculation.
 * @param {Object} move move to attack with
 * @param {Object} attacker attacking pokemon
 * @param {Object} defender defending pokemon
 */
function executeMove(move, attacker, defender) {
  const { damage, effective } = move.finalDamage(attacker, defender);

  defender.currentHp = defender.currentHp - damage;
  move.decrementPP();

  console.log(damage, effective, move.currentPP);

  let msg = "";
  if (effective) {
    if (effective.includes("super effective")) {
      msg = " It was super effective!";
    } else if (effective.includes("not very effective")) {
      msg = " I was not very effective...";
    } else if (effective.includes("immune")) {
      msg = " The attack missed!";
    }
  } 
  return msg;
}

/**
 * Checks if either the player or the opponent's pokemon has fainted, if so, runs the faining script and returns true.
 * @param {Object} gameObj the game object
 * @param {function} setGameObj function to update state
 * @return {boolean} true if pokemon faints, false otherwise
 */
async function checkFainted(gameObj, setGameObj) {
  let hasFainted = false;
  const playerPkmn = gameObj.player.currentPokemon;
  const opponentPkmn = gameObj.opponent.currentPokemon;

  if (playerPkmn.isFainted()) {
    hasFainted = true;
    runFainting(gameObj, gameObj.player);
    setGameObj({ ...gameObj });
    await new Promise((resolve) => {
      setTimeout(() => resolve(1), 2000);
    });
  }
  if (opponentPkmn.isFainted()) {
    hasFainted = true;
    runFainting(gameObj, gameObj.opponent);
    setGameObj({ ...gameObj });
    await new Promise((resolve) => {
      setTimeout(() => resolve(1), 2000);
    });
  }

  return hasFainted;
}

/**
 * Run fainting script, displays fainting message, removes fainted pokemon from battle
 * @param {Object} gameObj game object
 */
function runFainting(gameObj, trainer) {
  gameObj.currentMessage = `${trainer.currentPokemon.name} has fainted!`;
  trainer.currentPokemon = undefined;
  trainer.actionQueue = [];
}

/**
 * Set the player control menu to a yes/no prompt, with a given message. passed a callback for onYes and onNo.
 * @param {Object} gameObj The game object
 * @param {function} setGameObj function to update state
 * @param {Object} ynObj yes/no prompt object { onYes, onNo, prompt }
 */
async function showYesOrNoPrompt(gameObj, setGameObj, prompt) {
  return new Promise((resolve) => {
    gameObj.menuOptions = [
      {
        name: "yes",
        callback: () => {
          resolve("yes");
        },
      },
      {
        name: "no",
        callback: () => {
          resolve("no");
        },
      },
    ];

    gameObj.currentMessage = prompt;

    setGameObj({ ...gameObj });
  });
}

/**
 * Promt the player to choose a new pokemon to fight with.
 * @param {Object} gameObj The game object
 * @param {function} setGameObj function to update state
 */
async function playerSwitchToNewPokemon(gameObj, setGameObj) {
  return new Promise((resolve) => {
    const options = gameObj.player.pokemon.map((pkmn, idx) => ({
      name: pkmn.name,
      callback: async () => {
        resolve(idx);
      },
      disabled: pkmn.isFainted(),
    }));

    gameObj.menuOptions = options;
    gameObj.currentMessage = "Which Pokemon would you like to send out?";

    setGameObj({ ...gameObj });
  });
}

/**
 * Given the player and opponent objects, return an array with the turn order. i.e. ['player', 'opponent']
 * @param {Object} player player object
 * @param {Object} opponent opponent object
 * @return {Array} turn order array
 */
function getTurnOrder(player, opponent) {
  const playerSpeed = player.currentPokemon.getSpeed(player.actionQueue[0]);
  const opponentSpeed = opponent.currentPokemon.getSpeed(opponent.actionQueue[0]);

  if (playerSpeed >= opponentSpeed) {
    return ['player', 'opponent'];
  } else {
    return ['opponent', 'player'];
  }
}

/**
 * Returns true if any of the current pokemon are fainted, ignores pokemon if none are out at the time.
 * @param {gameObj}
 * @return {boolean} true if any are fainted
 */
function checkForFaintedPokemon(gameObj) {
  return (
    (gameObj.player.currentPokemon && gameObj.player.currentPokemon.isFainted()) ||
    (gameObj.opponent.currentPokemon && gameObj.opponent.currentPokemon.isFainted())
  );
}

async function wait(time) {
  await new Promise(resolve => {
    setTimeout(() => resolve(1), time * 1000);
  });
}

async function effectExpire(pkmn, gameObj, setGameObj) {
  pkmn.statusEffect.onEffectExpiration();
  gameObj.currentMessage = pkmn.statusEffect.messages.expire;
  playerPokemon.statusEffect = {};
  setGameObj({...gameObj});
  await wait(1.5);
}

export { startNewSimulation, getMoves, checkForFaintedPokemon };
