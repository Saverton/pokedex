import React from 'react';
import BattleSim from '../battle-components/BattleSim';

function BattlePage() {
  // generate game object, then launch BattleSim!
  const testPokemon = {
    sprites: {
      front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
      back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png"
    },
    maxHp: 50,
    currentHp: 45,
    name: "Ditto",
    moveSet: [
      {
        move: "transform",
        callback: () => console.log("transform!")
      }
    ]
  }
  
  const gameObjTemplate = {
    yourPkmn: testPokemon,
    opponentPkmn: testPokemon,
    currentMessage: "A Wild Ditto Appears!",
    currentOptions: testPokemon.moveSet
  }

  return (
    <>
      <h3>BattlePage</h3>
      <BattleSim gameObj={gameObjTemplate} />
    </>
  );
}

export default BattlePage;