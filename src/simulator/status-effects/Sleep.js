import StatusEffect from "./StatusEffect";

class Sleep extends StatusEffect {
  constructor(type, pkmn) {
    super(type, pkmn);
    this._duration = Math.floor(Math.random * (7 - 1)) + 1;
    // this._messages = {
    //   apply: (pkmn) => `${pkmn.name} fell asleep!`
    // }
  }

  get duration() {
    return this._duration;
  }

  onEffectApplication() {
    this.pkmn.canAttack = false;
  }
}

export default Sleep;