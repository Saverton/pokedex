import React from 'react';

function BattleControls({ options, setGameObj, gameObj }) {
  const controlButtons = options.map(
    (option, idx) => <button key={`${option.name}-${idx}`} onClick={() => handleClick(option.callback)} disabled={option.disabled}>{option.name}</button>
  );

  function handleClick(callback) {
    setGameObj({...callback(setGameObj)});
  }

  return (
    <div className="controls">
      {controlButtons}
    </div>
  )
}

export default BattleControls;