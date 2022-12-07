import React from 'react';
import BattleSprite from './BattleSprite';
import BattleStats from './BattleStats';

const POKEBALL_SPRITE = "https://grid-paint.com/images/png/4909218658254848.png";

function BattlePokemon({ pokemon, side }) {
  const pokemonOut = !!pokemon;
  // console.log({ pokemonOut });
  return (
    <>
      <BattleSprite sprite={pokemonOut ? pokemon.sprites[side] : POKEBALL_SPRITE} isPokemon={pokemonOut} />
      <BattleStats pokemon={pokemon} />
    </>
  );
}

export default BattlePokemon;