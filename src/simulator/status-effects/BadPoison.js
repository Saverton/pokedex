import StatusEffect from "./StatusEffect";

class BadPoison extends StatusEffect {
  static applyMessage = (pkmn) => `${pkmn.name} was badly poisoned!`;
  
  constructor(type, pkmn) {
    super(type, pkmn);
    this.icon = 'PSN';
    this._duration = Number.MAX_VALUE;
    this._messages = {
      duration: (_pkmn) => "",
      onAttack: (_pkmn) => "",
      onAfterTurn: (pkmn) => `${pkmn.name} was hurt by poison!`,
      expire: (_pkmn) => "",
    };
  }

  get duration() {
    return this._duration;
  }

  onAfterTurn() {
    let newHp = this._pkmn.currentHp;
    newHp -= Math.floor(newHp * this._turn / 16);
    this._pkmn.currentHp = newHp;

    this._turn++;
  }
}

export default BadPoison;