import React from 'react';

function BattleHpBar({ maxHp, currentHp }) {
  return (
    <div className="hp-bar">
      <span>HP : </span>
      <div className="hp-container">
        <div 
          className="hp-meter"
          style={{ 
            width: `${Math.floor(currentHp / maxHp * 100)}%`,
            height: '100%'
          }}  
        >
        </div>
      </div>
    </div>
  );
}

export default BattleHpBar;