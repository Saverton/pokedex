import StatusEffect from "./StatusEffect";

class Confusion extends StatusEffect {
  static messages = {
    apply: (pkmn) => `${pkmn.name} became confused!`,
    duration: (pkmn) => `${pkmn.name} is confused.`,
    onAttack: (_pkmn) => "It hurt itself in its confusion!",
    onAfterTurn: (_pkmn) => "",
    expire: (pkmn) => `${pkmn.name} recovered from confusion`,
  }

  constructor(type, pkmn) {
    super(type, pkmn);
    this._duration = Math.floor(Math.random() * (5-2)) + 2;
  }

  confusionDamage() {
    let baseDamage = Math.floor(
      Math.floor(
        ((Math.floor((this._pkmn.level * 2) / 5) + 2) * (40 * this._pkmn.stats.attack)) /
          this._pkmn.stats.defense /
          50
      )
    );
    if (baseDamage > 997) baseDamage = 997;
    baseDamage += 2;

    return baseDamage;
  }

  onBeforeTurn() {
    const rand = Math.floor(Math.random() * 2) + 1;

    if (rand === 1) {
      this._pkmn.currentHp -= this.confusionDamage();
      this._pkmn.canAttack = false;
    }
  }

  get duration() {
    return this._duration;
  }
}

export default Confusion;