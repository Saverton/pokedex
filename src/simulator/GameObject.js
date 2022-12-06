import Trainer from './Trainer';
import { getPokemonFromIds, getRandomPokemonTeam } from './GameFunctions';

class GameObject {
  constructor(player, opponent) {
    this.player = new Trainer(player);
    this.opponent = new Trainer(opponent);
    this.currentMessage = `${this.opponent.name} would like to battle!`;
    this._menuOptions = [];
    this._playerControl = false;
  }

  /**
   * @param {Array} newMenuOptions
   */
  set menuOptions(newMenuOptions) {
    this.menuOptions = newMenuOptions;
    this.playerControl = true;
  }

  /**
   * @param {boolean} canPlayerControl
   */
  set playerControl(canPlayerControl) {
    this.playerControl = canPlayerControl;
    if (!this.playerControl) {
      this.menuOptions = [];
    }
  }
}

async function startNewSimulation(playerTeam, opponentName) {
  console.log(playerTeam);
  // create player trainer
  const player = {
    name: "Player",
    pokemon: [
      ...playerTeam
    ]
  };
  console.log(player);

  const opponentPokemon = await getPokemonFromIds(getRandomPokemonTeam(player.pokemon.length));
  // create opponent trainer
  const opponent = {
    name: opponentName,
    pokemon: opponentPokemon
  };
  console.log(opponent);

  // construct game object
  const gameObj = new GameObject(player, opponent);
  console.log(gameObj);
  
  // return game object
  return gameObj;
}

export default GameObject;
export { startNewSimulation };