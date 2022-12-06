import React from 'react';

function BattleControls({ options }) {
  const controlButtons = options.map(
    option => <button key={option.move} onClick={option.callback}>{option.move}</button>
  );

  return (
    <div className="controls">
      {controlButtons}
    </div>
  )
}

export default BattleControls;