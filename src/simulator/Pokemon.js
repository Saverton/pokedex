import { ThemeConsumer } from "styled-components";
import { getMoves } from "./GameFunctions";

class Pokemon {
  constructor(pokemonObj) {
    this.name = pokemonObj.name;
    this._level = 50;
    this._types = pokemonObj.types;
    this._maxHp = pokemonObj.maxHp;
    this._currentHp = this.maxHp;
    this.moveSet = [];
    this.sprites = { ...pokemonObj.sprites };
    this._stats = pokemonObj.stats;
    getMoves(this, pokemonObj);
  }

  isFainted() {
    return this._currentHp === 0;
  }

  pokemonUseMove(moveObj, enemyPkmn) {
    // let moveQueue = [];
    // for(let i = 0; i < moveObj.moveLength(); i++) {
    //   moveQueue.push(null);
    // }
    // if(moveObj.target() === "opponent") moveQueue.push({moveObj.})
  }

  getSpeed(action) {
    const priorityActions = ['switch', 'item']
    if (priorityActions.includes(action.type) || action.name === 'Quick Attack') {
      return 1000;
    }
    else {
      return this.stats.speed;
    }
  }

  set currentHp(hp) {
    if (hp < 0) {
      this._currentHp = 0;
    } else if (hp > this.maxHp) {
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
