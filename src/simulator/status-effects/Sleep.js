import StatusEffect from "./StatusEffect";

class Sleep extends StatusEffect {
  constructor(type, pkmn) {
    super(type, pkmn);
    this._duration = Math.floor(Math.random * (7 - 1)) + 1;
  }

  onEffectApplication() {
    this.pkmn.canAttack = false;
  }
}

export default Sleep;