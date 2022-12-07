class Move {
  constructor(moveObj) {
    this._name = moveObj.name;
    this._type = moveObj.type;
    this._category = moveObj.stats.category;
    this._power = moveObj.stats.power;
    this._accuracy = moveObj.stats.accuracy;
    this._pp = moveObj.stats.pp;
    this._currentPP = moveObj.stats.pp;
    this._effect = moveObj.stats.effect;
  }

  strongAgainst() {
    switch (this.type) {
      case "fighting":
        return ["normal", "rock", "ice"];
        break;
      case "flying":
        return ["fighting", "bug", "grass"];
        break;
      case "poison":
        return ["bug", "grass"];
        break;
      case "ground":
        return ["poison", "rock", "fire", "electric"];
        break;
      case "rock":
        return ["flying", "bug", "fire", "ice"];
        break;
      case "bug":
        return ["poison", "grass", "psychic"];
        break;
      case "ghost":
        return ["ghost"];
        break;
      case "fire":
        return ["bug", "grass", "ice"];
        break;
      case "water":
        return ["ground", "rock", "fire"];
        break;
      case "grass":
        return ["ground", "rock", "water"];
        break;
      case "electric":
        return ["flying", "water"];
        break;
      case "psychic":
        return ["fighting", "poison"];
        break;
      case "ice":
        return ["flying", "ground", "grass", "dragon"];
        break;
      case "dragon":
        return ["dragon"];
        break;
      default:
        return [];
    }
  }

  weakAgainst() {
    switch (this.type) {
      case "normal":
        return ["rock"];
        break;
      case "fighting":
        return ["flying", "poison", "bug", "psychic"];
        break;
      case "flying":
        return ["rock", "electric"];
        break;
      case "poison":
        return ["poison", "ground", "rock", "ghost"];
        break;
      case "ground":
        return ["bug", "grass"];
        break;
      case "rock":
        return ["fighting", "ground"];
        break;
      case "bug":
        return ["fighting", "flying", "ghost", "fire"];
        break;
      case "fire":
        return ["rock", "fire", "water", "dragon"];
      case "water":
        return ["water", "grass", "dragon"];
        break;
      case "grass":
        return ["flying", "poison", "bug", "fire", "grass", "dragon"];
        break;
      case "electric":
        return ["grass", "electric", "dragon"];
        break;
      case "psychic":
        return ["psychic"];
        break;
      case "ice":
        return ["water", "ice"];
        break;
      default:
        return [];
    }
  }

  completelyIneffectiveAgainst() {
    switch(this.type) {
      case "normal": return ["ghost"]; break;
      case "fighting": return ["ghost"]; break;
      case "ground": return ["flying"]; break;
      case "ghost": return ["normal", "psychic"]; break;
      case "electric": return ["ground"]; break;
      default: return [];
    }
  }

  decrementPP() {
    this.currentPP--;
  }

  isAttack() {
    return !(this.category === "status");
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
          ((Math.floor((level * 2) / 5) + 2) * (this.power * attackStat)) /
            opponentDefenseStat /
            50
        )
      );
    if (baseDamage > 997) baseDamage = 997;
    baseDamage += 2;

    return baseDamage;
  }

  modifiedDamage(baseDamage, userTypes, defenderTypes) {
    let modifiedDamage = baseDamage;

    const damageObj = {
      damage: modifiedDamage,
      effective: [],
    };

    userTypes.forEach((type) => {
      if (type === this.type) damageObj.damage += Math.floor(baseDamage / 2);
    });

    defenderTypes.forEach((type) => {
      if (this.completelyIneffectiveAgainst().includes(type))
        return {
          damage: 0,
          effective: ["immune"],
        };

      if (this.strongAgainst().includes(type)) {
        damageObj.damage = Math.floor((damageObj.damage * 20) / 10);
        damageObj.effective.push("super effective");
      } else if (this.weakAgainst().includes(type)) {
        damageObj.damage = Math.floor((damageObj.damage * 5) / 10);
        damageObj.effective.push("not very effective");
      } else {
        damageObj.damage = Math.floor((damageObj.damage * 10) / 10);
      }
    });

    if (damageObj.effective.length === 0) damageObj.effective.push("normal");
    if (damageObj.effective.includes("super effective") && damageObj.effective.includes("super effective")) {
      damageObj.effective = ["normal"];
    }
    return damageObj;
  }

  randomFactor(modifiedDamage) {
    if (modifiedDamage.damage === 1) return 1;
    else {
      return {
        damage: Math.floor(
          (modifiedDamage.damage *
            (Math.floor(Math.random() * (255 - 217)) + 217)) /
            255
        ),
        effective: modifiedDamage.effective,
      };
    }
  }

  finalDamage(
    userLevel,
    userAttackStat,
    opponentDefenseStat,
    userTypes,
    opponentTypes
  ) {
    const base = this.baseDamage(
      userLevel,
      userAttackStat,
      opponentDefenseStat
    );
    const modified = this.modifiedDamage(base, userTypes, opponentTypes);

    return this.randomFactor(modified);
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
    return this._name;
  }

  get type() {
    return this._type;
  }

  get category() {
    return this._category;
  }

  get power() {
    return this._power;
  }

  get accuracy() {
    return this._accuracy;
  }

  get pp() {
    return this._pp;
  }

  get effect() {
    return this._effect;
  }
}

export default Move;
