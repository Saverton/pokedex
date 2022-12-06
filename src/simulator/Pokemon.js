
class Pokemon {
  constructor(pokemonObj) {
    this.name = pokemonObj.name;
    this.maxHp = pokemonObj.maxHp;
    this.currentHp = pokemonObj.maxHp;
    this.moveSet = [...pokemonObj.moves];
    this.sprites = {...pokemonObj.sprites};
  }
}

export default Pokemon;