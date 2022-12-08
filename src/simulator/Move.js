class Move {
  constructor(moveObj) {
    console.log(moveObj);
    this._name = moveObj.name;
    this._type = moveObj.type;
    this._category = moveObj.stats.category;
    this._power = parseInt(moveObj.stats.power);
    this._accuracy = parseInt(moveObj.stats.accuracy);
    this._pp = parseInt(moveObj.stats.pp);
    this._currentPP = parseInt(moveObj.stats.pp);
    this._effect = parseInt(moveObj.stats.effect);
    this._sideEffects = moveObj.sideEffects;
    this._hits = moveObj.hits || [1, 1];
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
    if (!this.isAttack()) return 0;

    let baseDamage = Math.floor(
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
    if (!this.isAttack()) {
      return {
        damage: 0,
        effective: "status move",
      };
    }

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
    if (
      damageObj.effective.includes("super effective") &&
      damageObj.effective.includes("not very effective")
    ) {
      damageObj.effective = ["normal"];
    }
    return damageObj;
  }

  randomFactor(modifiedDamage) {
    if (!this.isAttack()) {
      return {
        damage: 0,
        effective: "status move",
      };
    }

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

  finalDamage(userPkmn, opponentPkmn) {
    if (!this.isAttack()) {
      return {
        damage: 0,
        effective: "status move",
      };
    }
    if (this._name === "Night Shade") {
      return {
        damage: parseInt(userPkmn.level),
        effective: "normal",
      };
    }
    if (this._name === "Dragon Rage") {
      return {
        damage: 40,
        effective: "normal",
      };
    }

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

  get sideEffects() {
    return this._sideEffects;
  }

  get hits() {
    return Math.floor(Math.random() * (this._hits[1] - this._hits[0])) + 1;
  }

  getMoveActions(attacker, defender) {
    const moveLength = this.moveLength();
    const actions = [];

    if (moveLength === 1) {
      return [
        new Action(this.getMoveSteps(attacker, defender), this.name, 'move')
      ];
    }

    // OTHERWISE, NEED TO RUN CUSTOM CALLBACK
    return [];
  }

  getMoveSteps(attacker, defender) {
    const steps = [];
    const hits = this.hits;

    for (let i = 1; i <= hits; i++) {
      steps.push({
        msg: (i === 1) ? `${attacker.name} used ${this.name}!` : `${attacker.name} hits again!`,
        callback: () => this.runMove(attacker, defender)
      })
    }

    if (this.sideEffects) /* has side effects */ {
      this.sideEffects.forEach(
        sideEffect => {
          const sideEffectStep = {
            msg: "SIDE EFFECT!",
            callback: () => {
              console.log("SIDE EFFECT CALLBACK!");
            },
          } // genSideEffectObject(sideEffect); // <=== WHERE WE WILL PARSE THE SIDE EFFECT STRING
          steps.push(sideEffectStep);
        }
      )
    }

    return steps;
  }

  runMove(attacker, defender) {
    const { damage, effective } = this.finalDamage(attacker, defender);
    defender.currentHp = defender.currentHp - damage;
    this.decrementPP();

    if (effective) {
      if (effective.includes("super effective")) {
        return {
          msg: "It was super effective!", 
        };
      } else if (effective.includes("not very effective")) {
        return {
          msg: "It was not very effective..."
        };
      } else if (effective.includes("immune")) {
        return {
          msg: "The attack missed!"
        };
      }
    }
  }
}

export default Move;
