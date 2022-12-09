import Action from "./Action";

const customCallbacks = {
  ["Bide"]: (move, atk, def) => {
    const turnsToBide = Math.floor(Math.random() * 1) + 2
    const actions = [];
    for (let i = 0; i < turnsToBide; i++) {
      actions.push(waitTurn(`${atk.name} is biding its energy!`));
    }
    actions.push(bideAttack(move, atk, def, turnsToBide));
    return actions;
  },
  ["Fly"]: (move, atk, def) => {
    return [
      immuneTurn(`${atk.name} flew high in the sky!`, atk),
      new Action(move.getMoveSteps(atk, def), move.name, 'move') 
    ];
  },
  ["Dig"]: (move, atk, def) => {
    return [
      immuneTurn(`${atk.name} dug deep into the ground!`, atk),
      new Action(move.getMoveSteps(atk, def), move.name, 'move') 
    ];
  },
  ["Skull Bash"]: (move, atk, def) => {
    return [
      waitTurn(`${atk.name} lowered its head...`),
      new Action(move.getMoveSteps(atk, def), move.name, 'move') 
    ]
  },
  ['Sky Attack']: (move, atk, def) => {
    return [
      waitTurn(`${atk.name} is glowing...`),
      new Action(move.getMoveSteps(atk, def), move.name, 'move') 
    ]
  },
  ['Solar Beam']: (move, atk, def) => {
    return [
      waitTurn(`${atk.name} has taken in sunlight...`),
      new Action(move.getMoveSteps(atk, def), move.name, 'move') 
    ]
  },
}

function waitTurn(msg) {
  return new Action([
    {
      msg: msg,
      callback: () => null
    } 
  ], 'Wait', 'move')
}

function immuneTurn(msg, pkmn) {
  return new Action([
    {
      msg: msg,
      callback: () => {pkmn.immune = true}
    } 
  ], 'Immune Wait', 'move');
}

function bideAttack(move, atk, def, bideTime) {
  return new Action([
    {
      msg: `${atk.name} strikes back!`,
      callback: () => {
        let dmg = 0;
        for (let i = 0; i < bideTime; i++) {
          dmg += atk.recentDamage.damage[atk.recentDamage.damage.length - 1 - i] || 0;
        }
        const effective = (def.types.includes(move.completelyIneffectiveAgainst()[0]) ? 'immune' : 'normal');
        move.runMove(atk, def, {
          damage: dmg * 2,
          effective: effective
        });
      }
    } 
  ], 'Bide Wait', 'move')
}

export default customCallbacks;