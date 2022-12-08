import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";

class StatusEffect {
  constructor(type, pkmn) {
    this._name = type;
    this._pkmn = pkmn;
    this._turn = 0;
  }

  incrementTurn() {
    this._turn++;
  }

  runSideEffect() {
    return "default status effect does nothing";
  }
}

export default StatusEffect;
