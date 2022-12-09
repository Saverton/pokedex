import { generateSideEffectObject } from "./side-effect-manager";
import Action from "./Action";
import customCallbacks from "./custom-attack-callbacks";

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
    this._sideEffects = moveObj.sideEffects;
    this._hits = moveObj.hits || [1, 1];
    this._critRatio = moveObj.stats.critRatio || 1;
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
      return level;
    if(this._name === "Horn Drill" || this._name === "Fissure" || this._name === "Guillotine") return Number.MAX_VALUE;

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

    const damageObj = {
      ...baseDamage,
      effective: [],
    };

    userTypes.forEach((type) => {
      if (type === this._type && !this.hasFixedDamage())
        damageObj.damage += Math.floor(baseDamage.damage / 2);
    });

    defenderTypes.forEach((type) => {
      if (this.completelyIneffectiveAgainst().includes(type)) {
        damageObj.effective.push('immune');
        damageObj.damage = 0;
        return damageObj;
      }

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

    if (
      damageObj.effective.length === 0 ||
      ( damageObj.effective.includes("super effective") &&
      damageObj.effective.includes("not very effective") )
    ) {
      damageObj.effective = ["normal"];
    }
    return damageObj;
  }

  randomFactor(modifiedDamage) {
    if (!this.hasFixedDamage()) {
      if (modifiedDamage.damage === 1)
        return modifiedDamage;
      else {
        return {
          ...modifiedDamage,
          damage: Math.floor(
            (modifiedDamage.damage *
              (Math.floor(Math.random() * (255 - 217)) + 217)) /
              255
          )
        };
      }
    }
    return modifiedDamage;
  }

  finalDamage(userPkmn, opponentPkmn) {
    if (this.isAttack()) {
      let base = {};
      console.log(userPkmn, userPkmn.stats);
      let level = userPkmn.level;
      if (this.isCriticalHit(userPkmn)) {
        level *= 2;
        base.crit = true;
      }
      // use physical attack/defense if physical move, else use special attack/defense
      if (this._category === "physical") {
        base = {
          ...base,
          damage: this.baseDamage(
            level,
            userPkmn.stats.attack,
            opponentPkmn.stats.defense
          )
        };
      } else {
        base = {
          ...base,
          damage: this.baseDamage(
            level,
            userPkmn.stats.spAttack,
            opponentPkmn.stats.spDefense
          )
        };
      }
      console.log(base);

      const modified = this.modifiedDamage(
        base,
        userPkmn.types,
        opponentPkmn.types
      );
      
      console.log(modified);

      return this.randomFactor(modified);
    } else {
      return {
        damage: 0,
        effective: 'status move',
      }
    }
    
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

  isCriticalHit(userPkmn) {
    const random = Math.floor(Math.random() * 256);
    const threshold = Math.min(Math.floor(this.critRatio * Math.floor(userPkmn.stats.speed / 2) * userPkmn.stats.critRatio), 255);
    return random < threshold;
  }

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
    return Math.floor(Math.random() * (this._hits[1] - this._hits[0])) + this._hits[0];
  }

  getMoveActions(attacker, defender) {
    console.log("MOVE NAME => ", this.name);

    const moveLength = this.moveLength();
    const actions = [];

    if (moveLength === 1) {
      return [
        new Action(this.getMoveSteps(attacker, defender), this.name, 'move')
      ];
    }

    // OTHERWISE, NEED TO RUN CUSTOM CALLBACK
    return customCallbacks[this.name];
  }

  getMoveSteps(attacker, defender) {
    const steps = [];
    const hits = this.hits;
    console.log({ hits });

    for (let i = 1; i <= hits; i++) {
      steps.push({
        msg: (i === 1) ? `${attacker.name} used ${this.name}!` : `${attacker.name} hits again! (x${i})`,
        callback: () => this.runMove(attacker, defender)
      })
    }

    if (this.sideEffects) /* has side effects */ {
      this.sideEffects.forEach(
        sideEffect => {
          if (Math.random() < sideEffect.chance) {
            const sideEffectStep = generateSideEffectObject(sideEffect, attacker, defender);
            steps.push(sideEffectStep);
          }
        }
      )
    }

    return steps;
  }

  runMove(attacker, defender) {
    const { damage, effective, crit } = this.finalDamage(attacker, defender);
    console.log({ damage, effective, crit });
    defender.currentHp = defender.currentHp - damage;
    this.decrementPP();

    const extraSteps = [];

    if (crit) {
      extraSteps.push({
        msg: "Critical Hit!",
      })
    }
    if (effective) {
      if (effective.includes("super effective")) {
        extraSteps.push({
          msg: "It was super effective!", 
        });
      } else if (effective.includes("not very effective")) {
        extraSteps.push({
          msg: "It was not very effective..."
        });
      } else if (effective.includes("immune")) {
        extraSteps.push({
          msg: "The attack missed!"
        });
      }
    }

    return extraSteps;
  }
}

export default Move;
