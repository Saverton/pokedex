import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";

class StatusEffect {
  static applyMessage = (pkmn) => `${pkmn.name} got an effect!`;

  constructor(type, pkmn) {
    this._name = type;
    this._pkmn = pkmn;
    this._pkmn.statusEffect = this;
    this._turn = 1;
    this._duration = 0;
    this._messages = {
      duration: (pkmn) => `${pkmn.name} isn't feeling too good...`,
      onAttack: (_pkmn) => "",
      onAfterTurn: (_pkmn) => "",
      expire: (pkmn) => `${pkmn.name} is all better now!`,
    };
  }

  get duration() {
    return this._duration;
  }

  get turn() {
    return this._turn;
  }

  set turn(value) {
    this._turn = value;
  }

  get pkmn() {
    return this._pkmn;
  }

  set pkmn(value) {
    this._pkmn = value;
  }

  get name() {
    return this._pkmn;
  }

  set name(value) {
    this._name = value;
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

  onEffectExpiration() {}
}

export default StatusEffect;
