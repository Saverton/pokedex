import StatusEffect from "./StatusEffect";

class BadPoison extends StatusEffect {
  constructor(type, pkmn) {
    super(type, pkmn);
    this._duration = Number.MAX_VALUE;
  }
}

export default BadPoison;