import Pokemon from './Pokemon';

class Trainer {
  constructor(trainerObj) {
    this.name = trainerObj.name;
    this.pokemon = trainerObj.pokemon.map(
      pokemon => {
        console.log(pokemon);
        return new Pokemon(pokemon)
      }
    );
  }
}

export default Trainer;