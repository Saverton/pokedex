import { ThemeConsumer } from "styled-components";
import { getMoves } from "./GameFunctions";

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
    this._stats = pokemonObj.stats;
    getMoves(this);
  }

  isFainted() {
    return this._currentHp === 0;
  }

  calculateHp() {
    return (2 * this._baseHp * this._level) / 100 + this._level + 10;
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

  get types() {
    return this._types;
  }
}

export default Pokemon;
