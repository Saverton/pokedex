import React from "react";
import BattlePokemon from "./BattlePokemon";
import BattleTextbox from "./BattleTextbox";
import BattleControls from "./BattleControls";
import "./BattleSim.css";

function BattleSim({ gameObj, setGameObj }) {
  const { player, opponent } = gameObj;
  // const menuOptions = Object.keys(gameObj.menuOptions).map(

  // )

  if (Object.keys(gameObj).length === 0) {
    return <h3>Click Start!</h3>;
  } else {
    return (
      <div className="battle-sim">
        <div className="battle-scene">
          <div className="opponent pokemon">
            <BattlePokemon pokemon={opponent.currentPokemon} team={gameObj.opponent.pokemon} side="front" />
          </div>
          <div className="player pokemon">
            <BattlePokemon pokemon={player.currentPokemon} team={gameObj.player.pokemon} side="back" />
          </div>
        </div>
        <div className="battle-ui">
          <BattleTextbox text={gameObj.currentMessage} />
          <BattleControls options={gameObj._menuOptions} setGameObj={setGameObj} gameObj={gameObj} />
        </div>
      </div>
    );
  }
}

export default BattleSim;
