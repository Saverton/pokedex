import StatusEffect from "./StatusEffect";

class Poison extends StatusEffect {
  constructor(type, pkmn) {
    super(type, pkmn);
    this._duration = Number.MAX_VALUE;
  }
}

export default Poison;