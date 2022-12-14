import StatusEffect from "./StatusEffect";

class Paralyze extends StatusEffect {
  static applyMessage = (pkmn) => `${pkmn.name} became paralyzed!`;

  constructor(type, pkmn) {
    super(type, pkmn);
    this._duration = Number.MAX_VALUE;
    this._messages = {
      duration: (pkmn) =>
        `${pkmn.name} is paralyzed. It may be unable to attack.`,
      onAttack: (pkmn) => `${pkmn.name} is paralyzed. It can't move!`,
      onAfterTurn: (_pkmn) => "",
      expire: (_pkmn) => "",
    };
  }

  get duration() {
    return this._duration;
  }

  onEffectApplication() {
    let pkmnStats = { ...this._pkmn.stats };
    pkmnStats.speed = Math.floor(pkmnStats.attack * 0.25);
    this._pkmn.stats = pkmnStats;
  }

  onBeforeTurn() {
    let chanceToHit = Math.floor(Math.random() * 4 + 1);
    console.log(chanceToHit);

    switch (chanceToHit) {
      case 1:
        this._pkmn.canAttack = false;
        break;
      default:
        this._pkmn.canAttack = true;
    }
  }

  onEffectExpiration() {
    this._pkmn.stats = this._pkmn.calculateCurrentStats();
  }
}

export default Paralyze;
