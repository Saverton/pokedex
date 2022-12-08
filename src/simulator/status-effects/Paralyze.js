import StatusEffect from "./StatusEffect";

class Paralyze extends StatusEffect {
  constructor(type, pkmn) {
    super(type, pkmn);
    this._duration = Number.MAX_VALUE;
  }
}

export default Paralyze;