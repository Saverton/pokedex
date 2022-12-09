import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";

class StatusEffect {
  constructor(type, pkmn) {
    this._name = type;
    this._pkmn = pkmn;
    this._pkmn.statusEffect = this;
    this._turn = 1;
    this._messages = {
      apply: (pkmn) => `${pkmn.name} got an effect!`,
      duration: (pkmn) => `${pkmn.name} isn't feeling too good...`,
      expire: (pkmn) => `${pkmn.name} is all better now!`,
    }
  }

  get turn() {
    return this._turn;
  }

  onEffectApplication() {
    //METHOD STUB: IMPLEMENTED IN SUB-CLASSES
  }

  onBeforeTurn() {
    //METHOD STUB: IMPLEMENTED IN SUB-CLASSES
  }

  onAfterTurn() {
    this._turn++;
  }

  onEffectExpiration() {
    
  }
}

export default StatusEffect;
