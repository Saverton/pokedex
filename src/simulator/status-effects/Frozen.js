import StatusEffect from "./StatusEffect";

class Frozen extends StatusEffect {
  static applyMessage = (pkmn) => `${pkmn.name} became frozen!`;
  
  constructor(type, pkmn) {
    super(type, pkmn);
    this._duration = Number.MAX_VALUE;
    this._messages = {
      duration: (pkmn) => `${pkmn.name} is frozen!`,
      onAttack: (_pkmn) => "It can't move!",
      onAfterTurn: (_pkmn) => "",
      expire: (pkmn) => `${pkmn.name} thawed out!`,
    }
  }

  get duration() {
    return this._duration;
  }

  onEffectApplication() {
    this.pkmn.canAttack = false;
  }
}

export default Frozen;