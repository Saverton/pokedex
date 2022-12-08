import StatusEffect from "./StatusEffect";

class Frozen extends StatusEffect {
  constructor(type, pkmn) {
    super(type, pkmn);
    this._duration = Number.MAX_VALUE;
  }

  runStatChanges() {
    this.pkmn.canAttack = false;
  }
}

export default Frozen;