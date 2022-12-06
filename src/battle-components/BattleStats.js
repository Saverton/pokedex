import React from 'react';
import BattleHpBar from './BattleHpBar';

function BattleStats({ pokemon }) {
  const { name, maxHp, currentHp } = pokemon;
  return (
    <div className="battle-stats">
      <p><span>{name}</span> | lvl<span>{Math.floor(Math.random() * 50 + 1)}</span></p>
      <BattleHpBar maxHp={maxHp} currentHp={currentHp} />
      <p>{`${currentHp} / ${maxHp}`}</p>
    </div>
  )
}

export default BattleStats;