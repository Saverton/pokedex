import React from "react";
import BattlePokemon from "./BattlePokemon";
import BattleTextbox from "./BattleTextbox";
import BattleControls from "./BattleControls";
import "./BattleSim.css";

function BattleSim({ gameObj, setGameObj }) {
  const { player, opponent } = gameObj;

  if (Object.keys(gameObj).length === 0) {
    return <h3>Click Start!</h3>;
  } else {
    return (
      <div className="battle-sim">
        <div className="battle-scene">
          <div className="opponent pokemon">
            <BattlePokemon pokemon={opponent.currentPokemon} side="front" />
          </div>
          <div className="player pokemon">
            <BattlePokemon pokemon={player.currentPokemon} side="back" />
          </div>
        </div>
        <div className="battle-ui">
          <BattleTextbox text={gameObj.currentMessage} />
          <BattleControls options={gameObj.menuOptions || []} />
        </div>
      </div>
    );
  }
}

export default BattleSim;
