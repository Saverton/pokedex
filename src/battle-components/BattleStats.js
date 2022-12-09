import React from "react";
import BattleHpBar from "./BattleHpBar";

const POKEBALL_SPRITE = "https://grid-paint.com/images/png/4909218658254848.png";
const GRAY_POKEBALL_SPRITE = "./gray-pokeball-sprite.png"

function BattleStats({ pokemon, team }) {
  const numberPokemon = () => {
    return team.map(pkmn => {
      if(pkmn.isFainted()) {
        return <img key={`${pkmn.name}-ball #${Math.floor(Math.random() * 100)}`} className="pokeballs-remaining gray" src={GRAY_POKEBALL_SPRITE}></img>;
      } else {
        return <img key={`${pkmn.name}-ball #${Math.floor(Math.random() * 100)}`} className="pokeballs-remaining" src={POKEBALL_SPRITE}></img>;
      }
    })
  }
  if (pokemon) {
    const { name, maxHp, currentHp } = pokemon;
    return (
      <div className="battle-stats">
        <p>
          <span>{name}</span> | lvl<span>50</span>
        </p>
        <BattleHpBar maxHp={maxHp} currentHp={currentHp} />
        <p>{`${currentHp} / ${maxHp}`}</p>
      </div>
    );
  } else {
    return (
      <div className="battle-stats">
        <div></div>
        <div id="pokeballs-container">{numberPokemon()}</div>
      </div>
    );
  }
}

export default BattleStats;
