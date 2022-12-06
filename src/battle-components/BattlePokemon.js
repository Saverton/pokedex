import React from 'react';
import BattleSprite from './BattleSprite';
import BattleStats from './BattleStats';

function BattlePokemon({ pokemon, side }) {
  return (
    <>
      <BattleSprite sprite={pokemon.sprites[side]} />
      <BattleStats pokemon={pokemon} />
    </>
  );
}

export default BattlePokemon;