import React from 'react';

function BattleSprite({ sprite, isPokemon }) {
  return (
    <div className="sprite">
      <img src={sprite} alt="POKEMON SPRITE" className={isPokemon ? "pokemon" : "pokeball-battle"} />
    </div>
  )
}

export default BattleSprite;