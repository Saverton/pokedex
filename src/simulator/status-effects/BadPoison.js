import StatusEffect from "./StatusEffect";

class BadPoison extends StatusEffect {
  constructor(type, pkmn) {
    super(type, pkmn);
    this._duration = Number.MAX_VALUE;
  }

  runSideEffect() {
    let newHp = this._pkmn.currentHp;
    newHp -= Math.floor(newHp * this._turn / 16);
    this._pkmn.currentHp = newHp;

    this._turn++;
  }
}

export default BadPoison;