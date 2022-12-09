import StatusEffect from "./StatusEffect";

class Frozen extends StatusEffect {
  constructor(type, pkmn) {
    super(type, pkmn);
    this._duration = Number.MAX_VALUE;
  }

  get duration() {
    return this._duration;
  }

  onEffectApplication() {
    this.pkmn.canAttack = false;
  }
}

export default Frozen;