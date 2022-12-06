
class Pokemon {
  constructor(pokemonObj) {
    this.name = pokemonObj.name;
    this.maxHp = pokemonObj.maxHp || 50;
    this.currentHp = this.maxHp;
    this.moveSet = !!pokemonObj.moves ? [...pokemonObj.moves] : [];
    this.sprites = {...pokemonObj.sprites};
    console.log(this);
  }

  isFainted() {
    return this.currentHp === 0;
  }
}

export default Pokemon;