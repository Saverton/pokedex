
const SIDE_EFFECT_CALLBACKS = {
  eff: {

  },
  stat: {
    hp: (pkmn, val) => {
      return {
        msg: `${pkmn.name} ${(val > 0) ? 'restored' : 'lost'} some health!`,
        callback: () => { pkmn.currentHp += val }
      }
    },
    attack: generateAdjustedStatChangeCallback('attack'),
    defense: generateAdjustedStatChangeCallback('defense'),
    spAttack: generateAdjustedStatChangeCallback('spAttack'),
    spDefense: generateAdjustedStatChangeCallback('spDefense'),
    speed: generateAdjustedStatChangeCallback('speed'),
    accuracy: generateAdjustedStatChangeCallback('accuracy'),
    evasiveness: generateAdjustedStatChangeCallback('evasiveness'),
  }
}

function generateAdjustedStatChangeCallback(stat) {
  return (pkmn, val) => {
    return {
      msg: `${pkmn.name}'s ${stat} ${Math.abs(val) > 1 ? 'sharply ' : ""}${val > 0 ? 'rose' : 'fell'}!`,
      callback: () => {
        if (!pkmn.setAdjustedStat(stat, val)) {
          return {
            msg: `${stat} can't go any ${val > 0 ? "higher" : "lower"}!`
          }
        }
      }
    }
  }
}

function generateSideEffectObject(sideEffect, attacker, defender) {
  const { effect, value } = sideEffect;
  const effectSteps = effect.split('-');

  const applyTo = effectSteps[0] === 'self' ? attacker : defender;

  return SIDE_EFFECT_CALLBACKS[effectSteps[1]][effectSteps[2]](applyTo, value);
}

// path => <self/other>/<eff/stat>/<name>

export { generateSideEffectObject };