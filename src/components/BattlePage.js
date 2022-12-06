import React, { useState } from "react";
import BattleSim from "../battle-components/BattleSim";
import { startNewSimulation } from "../simulator/GameObject";
import BattleMusic from "../battle-components/BattleMusic";
import sound from "../pokemon-battle.mp3";

function BattlePage({ currentTeam }) {
  // generate game object, then launch BattleSim!
  const [gameObj, setGameObj] = useState({});

  // const testPokemon = {
  //   sprites: {
  //     front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
  //     back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png"
  //   },
  //   maxHp: 50,
  //   currentHp: 45,
  //   name: "Ditto",
  //   moveSet: [
  //     {
  //       move: "transform",
  //       callback: () => console.log("transform!")
  //     }
  //   ]
  // }

  // const gameObjTemplate = {
  //   yourPkmn: testPokemon,
  //   opponentPkmn: testPokemon,
  //   currentMessage: "A Wild Ditto Appears!",
  //   menuOptions: testPokemon.moveSet
  // }

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
