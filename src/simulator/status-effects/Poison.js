import StatusEffect from "./StatusEffect";

class Poison extends StatusEffect {
  constructor(type, pkmn) {
    super(type, pkmn);
    this._duration = Number.MAX_VALUE;
  }

  runSideEffect() {
    let newHp = this._pkmn.currentHp;
    newHp -= Math.floor(newHp / 16);
    this._pkmn.currentHp = newHp;

    this._turn++;
  }
}

export default Poison;