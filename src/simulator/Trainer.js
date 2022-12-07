import Pokemon from "./Pokemon";

class Trainer {
  constructor(trainerObj) {
    this.name = trainerObj.name;
    this.pokemon = trainerObj.pokemon.map((pokemon) => {
      // console.log(pokemon);
      return new Pokemon(pokemon);
    });
    this._currentPokemon = undefined;
    this._actionQueue = [];
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

  set actionQueue(actionQueue) {
    this._actionQueue = actionQueue;
  }

  get actionQueue() {
    return this._actionQueue;
  }

  sendOutPokemon(index) {
    this.currentPokemon = index;
    return `${this.name}: Go ${this.currentPokemon.name}!`
  }

  recallPokemon() {
    const pokemonName = this.currentPokemon.name;
    this.currentPokemon = undefined;
    return `${this.name}: Return, ${pokemonName}!`;
  }

  useTurn(gameObj, setGameObj) {
    const action = this.actionQueue.shift();
    // perform the current action!
    gameObj.currentMessage = action.message;
    action.script(gameObj);
    setGameObj({...gameObj});
  }
}

export default Trainer;
