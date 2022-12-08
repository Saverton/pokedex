import StatusEffect from "./StatusEffect";

class Frozen extends StatusEffect {
  constructor(type, pkmn) {
    super(type, pkmn);
    this._duration = Math.floor(Math.random * (5 - 2)) + 2;
  }
}

export default Frozen;