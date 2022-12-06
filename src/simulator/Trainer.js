import Pokemon from './Pokemon';

class Trainer {
  constructor(trainerObj) {
    this.name = trainerObj.name;
    this.pokemon = trainerObj.pokemon.forEach(
      pokemon => Pokemon(pokemon)
    );
  }
}

export default Trainer;