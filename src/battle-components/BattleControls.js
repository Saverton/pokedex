import React from 'react';

function BattleControls({ options, setGameObj, gameObj }) {
  const controlButtons = options.map(
    option => <button key={option.name} onClick={() => handleClick(option.callback)}>{option.name}</button>
  );

  function handleClick(callback) {
    setGameObj({...callback()});
  }

  return (
    <div className="controls">
      {controlButtons}
    </div>
  )
}

export default BattleControls;