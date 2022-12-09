import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";

class StatusEffect {

  static messages = {
    apply: (pkmn) => `${pkmn.name} got an effect!`,
    duration: (pkmn) => `${pkmn.name} isn't feeling too good...`,
    onAttack: (_pkmn) => "",
    expire: (pkmn) => `${pkmn.name} is all better now!`,
  }
  constructor(type, pkmn) {
    this._name = type;
    this._pkmn = pkmn;
    this._pkmn.statusEffect = this;
    this._turn = 1;
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
