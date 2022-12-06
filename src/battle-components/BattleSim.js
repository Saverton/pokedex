import React from 'react';
import BattlePokemon from './BattlePokemon';
import BattleTextbox from './BattleTextbox';
import BattleControls from './BattleControls';
import './BattleSim.css';

function BattleSim({ gameObj }) {
  return (
    <div className="battle-sim">
      <div className="battle-scene">
        <div className="opponent pokemon">
          <BattlePokemon pokemon={gameObj.opponentPkmn} side="front" />
        </div>
        <div className="player pokemon">
          <BattlePokemon pokemon={gameObj.yourPkmn} side="back" />
        </div>
      </div>
      <div className="battle-ui">
        <BattleTextbox text={gameObj.currentMessage} />
        <BattleControls options={gameObj.currentOptions} />
      </div>
    </div>
  )
}

export default BattleSim;