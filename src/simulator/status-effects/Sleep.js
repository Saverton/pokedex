import StatusEffect from "./StatusEffect";

class Sleep extends StatusEffect {
  static applyMessage = (pkmn) => `${pkmn.name} fell asleep!`;
  
  constructor(type, pkmn) {
    super(type, pkmn);
    this._duration = Math.floor(Math.random * (7 - 1)) + 1;
    this._messages = {
      duration: (_pkmn) => "",
      onAttack: (pkmn) => `${pkmn.name} is fast asleep.`,
      onAfterTurn: (_pkmn) => "",
      expire: (pkmn) => `${pkmn.name} woke up!`,
    }
  }

  get duration() {
    return this._duration;
  }

  onEffectApplication() {
    this.pkmn.canAttack = false;
  }
}

export default Sleep;