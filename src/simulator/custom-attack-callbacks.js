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
      immuneTurn(`${atk.name} flew high in the sky!`),
      move.getMoveSteps(atk, def)
    ];
  },
  ["Dig"]: (move, atk, def) => {
    return [
      immuneTurn(`${atk.name} dug deep into the ground!`),
      move.getMoveSteps(atk, def)
    ];
  },
  ["Skull Bash"]: (move, atk, def) => {
    return [
      waitTurn(`${atk.name} lowered its head...`),
      move.getMoveSteps(atk, def)
    ]
  },
  ['Sky Attack']: (move, atk, def) => {
    return [
      waitTurn(`${atk.name} is glowing...`),
      move.getMoveSteps(atk, def)
    ]
  },
  ['Solar Beam']: (move, atk, def) => {
    return [
      waitTurn(`${atk.name} has taken in sunlight...`),
      move.getMoveSteps(atk, def)
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
      msg: `${atk} strikes back!`,
      callback: () => {
        const dmg = 0;
        for (let i = 0; i < bideTime; i++) {
          dmg += atk.recentDamage[4 - i];
        }
        const effective = (def.types.includes(move.completelyIneffectiveAgainst()[0]) ? 'immune' : 'normal');
        move.runMove(atk, def, {
          damage: dmg,
          effective: effective
        });
      }
    } 
  ], 'Bide Wait', 'move')
}

export default customCallbacks;