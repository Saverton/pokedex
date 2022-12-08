class Move {
  constructor(moveObj) {
    this._name = moveObj.name;
    this._type = moveObj.type;
    this._category = moveObj.stats.category;
    this._power = parseInt(moveObj.stats.power);
    this._accuracy = parseInt(moveObj.stats.accuracy);
    this._pp = parseInt(moveObj.stats.pp);
    this._currentPP = parseInt(moveObj.stats.pp);
    this._effect = parseInt(moveObj.stats.effect);
  }

  strongAgainst() {
    switch (this.type) {
      case "fighting":
        return ["normal", "rock", "ice"];
      case "flying":
        return ["fighting", "bug", "grass"];
      case "poison":
        return ["bug", "grass"];
      case "ground":
        return ["poison", "rock", "fire", "electric"];
      case "rock":
        return ["flying", "bug", "fire", "ice"];
      case "bug":
        return ["poison", "grass", "psychic"];
      case "ghost":
        return ["ghost"];
      case "fire":
        return ["bug", "grass", "ice"];
      case "water":
        return ["ground", "rock", "fire"];
      case "grass":
        return ["ground", "rock", "water"];
      case "electric":
        return ["flying", "water"];
      case "psychic":
        return ["fighting", "poison"];
      case "ice":
        return ["flying", "ground", "grass", "dragon"];
      case "dragon":
        return ["dragon"];
      default:
        return [];
    }
  }

  weakAgainst() {
    switch (this.type) {
      case "normal":
        return ["rock"];
      case "fighting":
        return ["flying", "poison", "bug", "psychic"];
      case "flying":
        return ["rock", "electric"];
      case "poison":
        return ["poison", "ground", "rock", "ghost"];
      case "ground":
        return ["bug", "grass"];
      case "rock":
        return ["fighting", "ground"];
      case "bug":
        return ["fighting", "flying", "ghost", "fire"];
      case "fire":
        return ["rock", "fire", "water", "dragon"];
      case "water":
        return ["water", "grass", "dragon"];
      case "grass":
        return ["flying", "poison", "bug", "fire", "grass", "dragon"];
      case "electric":
        return ["grass", "electric", "dragon"];
      case "psychic":
        return ["psychic"];
      case "ice":
        return ["water", "ice"];
      default:
        return [];
    }
  }

  completelyIneffectiveAgainst() {
    switch (this.type) {
      case "normal":
        return ["ghost"];
      case "fighting":
        return ["ghost"];
      case "ground":
        return ["flying"];
      case "ghost":
        return ["normal", "psychic"];
      case "electric":
        return ["ground"];
      default:
        return [];
    }
  }

  decrementPP() {
    this._currentPP--;
  }

  isAttack() {
    return !(this._category === "status");
  }

  target() {
    if (this._accuracy === "") return "opponent";
    else return "self";
  }

  priority() {
    if (this._name === "Quick Attack") {
      return 1;
    } else if (this._name === "Counter") {
      return -1;
    }

    return 0;
  }

  hasFixedDamage() {
    if (this._power === "") return true;

    return false;
  }

  baseDamage(level, attackStat, opponentDefenseStat) {
    if (!this.isAttack()) return 0;

    if (this._name === "Dragon Rage") return 40;
    if (this._name === "Night Shade" || this._name === "Seismic Toss")
      return this._level;

    let baseDamage = Math.floor(
      Math.floor(
        ((Math.floor((level * 2) / 5) + 2) * (this._power * attackStat)) /
          opponentDefenseStat /
          50
      )
    );
    if (baseDamage > 997) baseDamage = 997;
    baseDamage += 2;

    return baseDamage;
  }

  modifiedDamage(baseDamage, userTypes, defenderTypes) {
    if (!this.isAttack()) {
      return {
        damage: baseDamage,
        effective: "status move",
      };
    }

    let modifiedDamage = baseDamage;

    const damageObj = {
      damage: modifiedDamage,
      effective: [],
    };

    userTypes.forEach((type) => {
      if (type === this._type && !this.hasFixedDamage())
        damageObj.damage += Math.floor(baseDamage / 2);
    });

    defenderTypes.forEach((type) => {
      if (this.completelyIneffectiveAgainst().includes(type))
        return {
          damage: 0,
          effective: ["immune"],
        };

      if (!this.hasFixedDamage()) {
        if (this.strongAgainst().includes(type)) {
          damageObj.damage = Math.floor((damageObj.damage * 20) / 10);
          damageObj.effective.push("super effective");
        } else if (this.weakAgainst().includes(type)) {
          damageObj.damage = Math.floor((damageObj.damage * 5) / 10);
          damageObj.effective.push("not very effective");
        } else {
          damageObj.damage = Math.floor((damageObj.damage * 10) / 10);
        }
      }
    });

    if (damageObj.effective.length === 0) damageObj.effective.push("normal");
    if (
      damageObj.effective.includes("super effective") &&
      damageObj.effective.includes("not very effective")
    ) {
      damageObj.effective = ["normal"];
    }
    return damageObj;
  }

  randomFactor(modifiedDamage) {
    if (!this.isAttack() || !this.hasFixedDamage()) {
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
    return modifiedDamage;
  }

  finalDamage(userPkmn, opponentPkmn) {
    let base;

    // use physical attack/defense if physical move, else use special attack/defense
    if (this._category === "physical") {
      base = this.baseDamage(
        userPkmn.level,
        userPkmn.stats.attack,
        opponentPkmn.stats.defense
      );
    } else {
      base = this.baseDamage(
        userPkmn.level,
        userPkmn.stats.spAttack,
        opponentPkmn.stats.spDefense
      );
    }
    const modified = this.modifiedDamage(
      base,
      userPkmn.types,
      opponentPkmn.types
    );

    return this.randomFactor(modified);
  }

  moveLength() {
    if (this._name === "Bide") return 3;
    else if (
      this._name === "Fly" ||
      this._name === "Dig" ||
      this._name === "Skull Bash" ||
      this._name === "Sky Attack" ||
      this._name === "Solar Beam" ||
      this._name === "Counter"
    )
      return 2;
    else return 1;
  }

  useMove() {}

  get name() {
    return this._name;
  }

  get currentPP() {
    return this._currentPP;
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
