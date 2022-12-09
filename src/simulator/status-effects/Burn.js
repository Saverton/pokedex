import StatusEffect from "./StatusEffect";

class Burn extends StatusEffect {
  static applyMessage = (pkmn) => `${pkmn.name} got a burn!`;
  
  constructor(type, pkmn) {
    super(type, pkmn);
    this._duration = Number.MAX_VALUE;
    this._messages = {
      duration: (_pkmn) => "",
      onAttack: (_pkmn) => "",
      onAfterTurn: (pkmn) => `${pkmn.name} was hurt by its burn!`,
      expire: (_pkmn) => "",
    };
  }

  get duration() {
    return this._duration;
  }

  onEffectApplication() {
    let pkmnStats = { ...this._pkmn.stats };
    pkmnStats.attack = pkmnStats.attack / 2;
    this._pkmn.stats = pkmnStats;
  }

  onAfterTurn() {
    let newHp = this._pkmn.currentHp;
    newHp -= Math.floor(newHp / 16);
    this._pkmn.currentHp = newHp;

    this._turn++;
  }

  onEffectExpiration() {
    this._pkmn.stats = this._pkmn.calculateCurrentStats();
  }
}

export default Burn;
