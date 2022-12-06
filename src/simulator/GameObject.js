import Trainer from './Trainer';

class GameObject {
  constructor(player, opponent) {
    this.player = new Trainer(player);
    this.opponent = new Trainer(opponent);
    this.displayText = `${this.opponent.name} would like to battle!`;
    this.menuOptions = [];
    this.playerControl = false;
  }

  /**
   * @param {string} newText
   */
  set displayText(newText) {
    this.displayText = newText;
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

export default GameObject;