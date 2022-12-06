import Pokemon from "./Pokemon";

class Trainer {
  constructor(trainerObj) {
    this.name = trainerObj.name;
    this.pokemon = trainerObj.pokemon.map((pokemon) => {
      // console.log(pokemon);
      return new Pokemon(pokemon);
    });
    this._currentPokemon = undefined;
  }

  isAbleToBattle() {
    let allFainted = true;
    this.pokemon.forEach((pokemon) => {
      if (!pokemon.isFainted()) 
        allFainted = false;
    });
    return !allFainted;
  }

  set currentPokemon(pokemonIndex) {
    if (pokemonIndex >= 0 && pokemonIndex < this.pokemon.length && !this.pokemon[pokemonIndex].isFainted())
      this._currentPokemon = this.pokemon[pokemonIndex];
  }

  get currentPokemon() {
    return this._currentPokemon;
  }

  sendOutPokemon(index) {
    this.currentPokemon = index;
    return `${this.name}: Go ${this.currentPokemon.name}!`
  }
}

export default Trainer;
