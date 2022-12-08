import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";

class StatusEffect {
  constructor(type, pkmn) {
    this._name = type;
    this._pkmn = pkmn;
    this._pkmn.statusEffect = this;
    this._turn = 1;
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
}

export default StatusEffect;
