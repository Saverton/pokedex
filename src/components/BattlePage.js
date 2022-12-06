import React, { useState } from "react";
import BattleSim from "../battle-components/BattleSim";
import { startNewSimulation } from "../simulator/GameObject";
import BattleMusic from "../battle-components/BattleMusic";
import sound from "../pokemon-battle.mp3";

function BattlePage({ currentTeam }) {
  // generate game object, then launch BattleSim!
  const [gameObj, setGameObj] = useState({});

  async function onStartClick() {
    setGameObj(await startNewSimulation(currentTeam, "Opponent"));
  }

  return (
    <>
      <BattleMusic url={sound} />
      <h3>BattlePage</h3>
      <button onClick={onStartClick}>Start Sim!</button>
      <BattleSim gameObj={gameObj} />
    </>
  );
}

export default BattlePage;
