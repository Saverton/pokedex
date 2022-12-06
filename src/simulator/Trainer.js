import Pokemon from "./Pokemon";

class Trainer {
  constructor(trainerObj) {
    this.name = trainerObj.name;
    this.pokemon = trainerObj.pokemon.map((pokemon) => {
      console.log(pokemon);
      return new Pokemon(pokemon);
    });
  }

  isAbleToBattle() {
    let allFainted = true;
    this.pokemon.forEach((pokemon) => {
      if (pokemon.currentHp > 0) allFainted = false;
    });
    return !allFainted;
  }
}

export default Trainer;
