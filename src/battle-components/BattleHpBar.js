import React from 'react';

function BattleHpBar({ maxHp, currentHp }) {
  return (
    <div className="hp-bar">
      <span>HP : </span>
      <div className="hp-container">
        <div 
          className="hp-meter"
          style={{ width: `${Math.floor(currentHp / maxHp * 100)}%`}}  
        >
          HP ITSELF {/* style will be applied according to hp */}
        </div>
      </div>
    </div>
  );
}

export default BattleHpBar;