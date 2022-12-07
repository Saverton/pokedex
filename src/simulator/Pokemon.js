import Move from "./Move";

class Pokemon {
  constructor(pokemonObj) {
    this.name = pokemonObj.name;
    this._maxHp = pokemonObj.maxHp || 50;
    this._currentHp = this.maxHp;
    this.moveSet = !!pokemonObj.moves ? [...pokemonObj.moves] : [];
    this.sprites = { ...pokemonObj.sprites };
    // console.log(this);
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
}

export default Pokemon;
