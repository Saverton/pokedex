class Move {
  constructor(moveObj) {
    this.name = moveObj.name;
    this.type = moveObj.type;
    this.category = moveObj.stats.category;
    this.power = moveObj.stats.power;
    this.accuracy = moveObj.stats.accuracy;
    this.pp = moveObj.stats.pp;
    this.currentPP = moveObj.stats.pp;
    this.effect = moveObj.stats.effect;
  }

  strongAgainst() {
    if (this.type === "normal") return [];
    if (this.type === "fighting") return ["normal", "rock", "ice"];
    if (this.type === "flying") return ["fighting", "bug", "grass"];
    if (this.type === "poison") return ["bug", "grass"];
    if (this.type === "ground") return ["poison", "rock", "fire", "electric"];
    if (this.type === "rock") return ["flying", "bug", "fire", "ice"];
    if (this.type === "bug") return ["poison", "grass", "psychic"];
    if (this.type === "ghost") return ["ghost"];
    if (this.type === "fire") return ["bug", "grass", "ice"];
    if (this.type === "water") return ["ground", "rock", "fire"];
    if (this.type === "grass") return ["ground", "rock", "water"];
    if (this.type === "electric") return ["flying", "water"];
    if (this.type === "psychic") return ["fighting", "poison"];
    if (this.type === "ice") return ["flying", "ground", "grass", "dragon"];
    if (this.type === "dragon") return ["dragon"];
  }

  weakAgainst() {
    if (this.type === "normal") return ["rock"];
    if (this.type === "fighting") return ["flying", "poison", "bug", "psychic"];
    if (this.type === "flying") return ["rock", "electric"];
    if (this.type === "poison") return ["poison", "ground", "rock", "ghost"];
    if (this.type === "ground") return ["bug", "grass"];
    if (this.type === "rock") return ["fighting", "ground"];
    if (this.type === "bug") return ["fighting", "flying", "ghost", "fire"];
    if (this.type === "ghost") return [];
    if (this.type === "fire") return ["rock", "fire", "water", "dragon"];
    if (this.type === "water") return ["water", "grass", "dragon"];
    if (this.type === "grass")
      return ["flying", "poison", "bug", "fire", "grass", "dragon"];
    if (this.type === "electric") return ["grass", "electric", "dragon"];
    if (this.type === "psychic") return ["psychic"];
    if (this.type === "ice") return ["water", "ice"];
    if (this.type === "dragon") return [];
  }

  completelyIneffectiveAgainst() {
    if (this.type === "normal") return ["ghost"];
    if (this.type === "fighting") return ["ghost"];
    if (this.type === "ground") return ["flying"];
    if (this.type === "ghost") return ["normal", "psychic"];
    if (this.type === "electric") return ["ground"];

    return [];
  }

  decrementPP() {
    this.currentPP--;
  }

  isAttack() {
    return !this.category === "status";
  }

  target() {
    if (this.accuracy === "") return "opponent";
    else return "self";
  }

  priority() {
    if (this.name === "Quick Attack") {
      return 1;
    } else if (this.name === "Counter") {
      return -1;
    }

    return 0;
  }

  baseDamage(level, attackStat, opponentDefenseStat) {
    let baseDamage = 0;
    if (this.isAttack())
      baseDamage = Math.floor(
        Math.floor(
          Math.floor((level * 2) / 5) +
            (2 * this.power * attackStat) / opponentDefenseStat
        ) / 50
      );
    if (baseDamage > 997) baseDamage = 997;
    baseDamage += 2;

    return baseDamage;
  }

  modifiedDamage(baseDamage, userType, defenderTypes) {
    let modifiedDamage = baseDamage;
    if (userType === this.type) modifiedDamage += Math.floor(baseDamage / 2);

    defenderTypes.forEach((type) => {
      if (this.completelyIneffectiveAgainst().includes(type)) return 0;

      if (this.strongAgainst().includes(type))
        modifiedDamage = Math.floor((modifiedDamage * 20) / 10);
      else if (this.weakAgainst().includes(type))
        modifiedDamage = Math.floor((modifiedDamage * 5) / 10);
      else modifiedDamage = Math.floor((modifiedDamage * 10) / 10);
    });

    return modifiedDamage;
  }

  randomFactor(modifiedDamage) {
    if (modifiedDamage === 1) return 1;
    else {
      return modifiedDamage * Math.floor(Math.random() * (255 - 217)) + 217;
    }
  }

  moveLength() {
    if (this.name === "Bide") return 3;
    else if (
      this.name === "Fly" ||
      this.name === "Dig" ||
      this.name === "Skull Bash" ||
      this.name === "Sky Attack" ||
      this.name === "Solar Beam" ||
      this.name === "Counter"
    )
      return 2;
    else return 1;
  }

  useMove() {}

  get name() {
    return this.name;
  }

  get type() {
    return this.type;
  }

  get category() {
    return this.category;
  }

  get power() {
    return this.power;
  }

  get accuracy() {
    return this.accuracy;
  }

  get pp() {
    return this.pp;
  }

  get effect() {
    return this.effect;
  }
}

export default Move;
