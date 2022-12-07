import Trainer from './Trainer.js';
import { getPokemonFromIds, getRandomPokemonTeam } from './GameFunctions.js';

class GameObject {
  constructor(player, opponent) {
    this.player = new Trainer(player);
    this.opponent = new Trainer(opponent);
    this.currentMessage = `${this.opponent.name} would like to battle!`;
    this._menuOptions = [];
    this._playerControl = false;
  }

  get menuOptions() {
    return this._menuOptions;
  }

  get playerControl() {
    return this._playerControl;
  }

  /**
   * @param {Array} newMenuOptions
   */
  set menuOptions(newMenuOptions) {
    this._menuOptions = newMenuOptions;
    this._playerControl = true;
  }

  /**
   * @param {boolean} canPlayerControl
   */
  set playerControl(canPlayerControl) {
    this._playerControl = canPlayerControl;
    if (!this.playerControl) {
      this._menuOptions = [];
    }
  }
}

export default GameObject;