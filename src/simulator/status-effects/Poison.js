import StatusEffect from "./StatusEffect";

class Poison extends StatusEffect {
  static messages = {
    apply: (pkmn) => `${pkmn.name} was poisoned!`,
    duration: (_pkmn) => "",
    onAttack: (_pkmn) => "",
    onAfterTurn: (pkmn) => `${pkmn.name} was hurt by poison!`,
    expire: (_pkmn) => "",
  }
  constructor(type, pkmn) {
    super(type, pkmn);
    this._duration = Number.MAX_VALUE;
  }

  get duration() {
    return this._duration;
  }

  onAfterTurn() {
    let newHp = this._pkmn.currentHp;
    newHp -= Math.floor(newHp / 16);
    this._pkmn.currentHp = newHp;

    this._turn++;
  }
}

export default Poison;