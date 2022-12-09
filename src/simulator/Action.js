
class Action {
  constructor(steps, name, type, ...params) {
    this.steps = steps;
    this.name = name;
    this.type = type;
  }

  async executeStep(gameObj, setGameObj) {
    const step = this.steps.shift();
    let msg = step.msg;
    gameObj.currentMessage = msg;
    setGameObj({...gameObj});
    let newSteps = [];
    if (step.callback) {
      newSteps = await step.callback();
    }
    // if there is a new step, add it on!
    if (newSteps && newSteps.length > 0) {
      this.steps.unshift(...newSteps);
    }
    // 1 second delay before continuing
    await new Promise(resolve => {
      setTimeout(() => resolve(1), step.timeout || 1000);
    })
  }
}

function getActionFromPokemonSwitch(callback) {
  return new Action([
    {
      msg: "Player has switched pokemon!",
      callback: callback,
      timeout: 0,
    }
  ], 'Switch Pokemon', 'switch');
}

export default Action;
export { getActionFromPokemonSwitch }


// /**
//  * Create an action object for a pokemon's move. The action object has a message and a script that will run.
//  * @param {Object} pokemon The pokemon executing the move
//  * @param {string} moveName name of the move
//  * @param {function} callback action script
//  * @return {Object} action object
//  */
// function generateActionObjFromMove(pokemon, moveName, callback) {
//   return {
//     name: moveName,
//     type: 'move',
//     message: `${pokemon.name} used ${moveName}!`,
//     script: callback,
//   };
// }

// function generateActionObjFromPokemonSwitch(callback) {
//   return {
//     name: 'Switch Pokemon',
//     type: 'switch',
//     message: 'Player switched out their Pokemon.',
//     script: callback
//   };
// }