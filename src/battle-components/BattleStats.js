import React from 'react';
import BattleHpBar from './BattleHpBar';

function BattleStats({ pokemon }) {
  if (pokemon) {
    const { name, maxHp, currentHp } = pokemon;
    return (
      <div className="battle-stats">
        <p><span>{name}</span> | lvl<span>50</span></p>
        <BattleHpBar maxHp={maxHp} currentHp={currentHp} />
        <p>{`${currentHp} / ${maxHp}`}</p>
      </div>
    )
  } else {
    return (
      <div className="battle-stats">
        <p>NUMBER OF POKEMON IN TEAM</p>
      </div>
    );
  }
}

export default BattleStats;