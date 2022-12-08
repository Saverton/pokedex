import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";

class StatusEffect {
  constructor(type, pkmn) {
    this._name = type;
    this._pkmn = pkmn;
    this._turn = 1;
  }

  incrementTurn() {
    this._turn++;
  }

  runStatChanges() {}

  runSideEffect() {
    this._turn++;
  }
}

export default StatusEffect;
