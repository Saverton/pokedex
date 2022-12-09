import { ThemeConsumer } from "styled-components";
import { getMoves } from "./GameFunctions";
import DamageQueue from "./DamageQueue";

class Pokemon {
  constructor(pokemonObj) {
    this.name = pokemonObj.name;
    this._level = 50;
    this._types = pokemonObj.types;
    this._baseHp = pokemonObj.maxHp;
    // HP formula is ((2 times baseHP times level) divide by 100) plus level plus 10
    this._maxHp = this.calculateHp();
    this._currentHp = this.maxHp;
    this.moveSet = [];
    this.sprites = { ...pokemonObj.sprites };
    this._adjustedStats = {
      attack: 0,
      defense: 0,
      spAttack: 0,
      spDefense: 0,
      speed: 0,
      accuracy: 0,
      evasiveness: 0,
      critRatio: 1,
    };
    this._baseStats = this.padBaseStats(pokemonObj.stats);
    this._stats = this.calculateCurrentStats();
    this._statusEffect = {};
    this._canAttack = true;
    this._immune = false;
    this._recentDamage = new DamageQueue();
    getMoves(this, pokemonObj);
  }

  padBaseStats(stats) {
    let baseStats = { ...stats };
    baseStats["accuracy"] = 1;
    baseStats["evasiveness"] = 1;

    return baseStats;
  }

  isFainted() {
    return this._currentHp === 0;
  }

  calculateHp() {
    return (2 * this._baseHp * this._level) / 100 + this._level + 10;
  }

  /**
   *
   * @returns an object of the correct stat multiplier values based on this._adjustedStats
   */
  calculateStatMultipliers() {
    const multipliers = {};
    Object.keys(this._adjustedStats).forEach((key) => {
      switch (this._adjustedStats[key]) {
        case -6:
          multipliers[key] = 0.25;
          break;
        case -5:
          multipliers[key] = 0.28;
          break;
        case -4:
          multipliers[key] = 0.33;
          break;
        case -3:
          multipliers[key] = 0.4;
          break;
        case -2:
          multipliers[key] = 0.5;
          break;
        case -1:
          multipliers[key] = 0.66;
          break;
        case 0:
          multipliers[key] = 1;
          break;
        case 1:
          multipliers[key] = 1.5;
          break;
        case 2:
          multipliers[key] = 2;
          break;
        case 3:
          multipliers[key] = 2.5;
          break;
        case 4:
          multipliers[key] = 3;
          break;
        case 5:
          multipliers[key] = 3.5;
          break;
        case 5:
          multipliers[key] = 4;
          break;
      }
    });
    return multipliers;
  }

  /**
   *
   * @returns the pokemon's current stats as the sum of base and adjusted stats, plus level adjustments
   */
  calculateCurrentStats() {
    const multipliers = this.calculateStatMultipliers();

    let currentStats = {};

    Object.keys(this._baseStats).forEach((key) => {
      if (key === "accuracy" || key === "evasiveness") {
        currentStats[key] = this._baseStats[key] * multipliers[key];
      } else {
        currentStats[key] = this._baseStats[key] * multipliers[key];
        currentStats[key] += (currentStats[key] * this._level) / 50;
      }
    });

    return currentStats;
  }

  /**
   * allows setting the pokemon's adjusted stats, theoretically by status moves, but keeps base stats private
   */
  set adjustedStats({ attack, defense, spAttack, spDefense, speed }) {
    this._adjustedStats.attack += attack;
    this._adjustedStats.defense += defense;
    this._adjustedStats.spAttack += spAttack;
    this._adjustedStats.spDefense += spDefense;
    this._adjustedStats.speed += speed;
  }

  /**
   * Sets a specific adjusted stat, prevents stat from passing max/min val and returns boolean on success.
   * @param {string} name
   * @param {number} value
   * @returns boolean (success?)
   */
  setAdjustedStat(name, value) {
    if (Math.abs(this._adjustedStats[name]) === 6) {
      return false;
    } else {
      this._adjustedStats[name] = value;
      return true;
    }
  }

  getSpeed(action) {
    const priorityActions = ["switch", "item"];
    if (
      priorityActions.includes(action.type) ||
      action.name === "Quick Attack"
    ) {
      return 1000;
    } else {
      return this.stats.speed;
    }
  }

  set currentHp(hp) {
    if (hp < 0) {
      this._currentHp = 0;
    } else if (hp > this._maxHp) {
      this._currentHp = this._maxHp;
    } else {
      this._currentHp = hp;
    }
  }

  get currentHp() {
    return this._currentHp;
  }

  get maxHp() {
    return this._maxHp;
  }

  get level() {
    return this._level;
  }

  get stats() {
    return this._stats;
  }

  set stats(newStats) {
    this._stats = newStats;
  }

  get types() {
    return this._types;
  }

  get statusEffect() {
    if (Object.keys(this._statusEffect).length === 0) {
      return false;
    } else {
      return this._statusEffect;
    }
  }

  set statusEffect(status) {
    this._statusEffect = status;
    this._statusEffect.onEffectApplication();
  }

  get canAttack() {
    return this._canAttack;
  }

  set canAttack(value) {
    this._canAttack = value;
  }

  get recentDamage() {
    return this._recentDamage;
  }

  get immune() {
    return this._immune;
  }

  set immune(value) {
    this._immune = value;
  }

  resetTurnStats() {
    this.canAttack = true;
    this.immune = false;
  }
}

export default Pokemon;
