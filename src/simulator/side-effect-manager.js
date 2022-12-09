import Burn from "./status-effects/Burn";
import Paralyze from "./status-effects/Paralyze";
import Poison from "./status-effects/Poison";
import BadPoison from "./status-effects/BadPoison";
import Sleep from "./status-effects/Sleep";
import Frozen from "./status-effects/Frozen";
import { createStatusEffect } from "./status-effects/StatusEffectFactory"


const SIDE_EFFECT_CALLBACKS = {
  eff: {
    brn: (pkmn) => ({
      msg: Burn.messages.apply(pkmn),
      callback: () => createStatusEffect('brn', pkmn)
    }),
    prz: (pkmn) => ({
      msg: Paralyze.messages.apply(pkmn),
      callback: () => createStatusEffect('prz', pkmn)
    }),
    psn: (pkmn) => ({
      msg: Poison.messages.apply(pkmn),
      callback: () => createStatusEffect('psn', pkmn)
    }),
    badpsn: (pkmn) => ({
      msg: BadPoison.messages.apply(pkmn),
      callback: () => createStatusEffect('badpsn', pkmn)
    }),
    slp: (pkmn) => ({
      msg: Sleep.messages.apply(pkmn),
      callback: () => createStatusEffect('slp', pkmn)
    }),
    frz: (pkmn) => ({
      msg: Frozen.messages.apply(pkmn),
      callback: () => createStatusEffect('frz', pkmn)
    }),
    cnf: (pkmn) => ({
      msg: `${pkmn} became confused, but then got even more confused because confusion hasn't been coded yet! Confuception => cancels out!`,
      callback: () => console.log('confusion? what? Wait, I\'m confused...')
    })
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
    critRatio: (pkmn, val) => {
      return {
        msg: `${pkmn.name}'s critical hit ratio increased!`,
        callback: () => { pkmn.stats.critRatio = val}
      }
    }
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

  return SIDE_EFFECT_CALLBACKS[effectSteps[1]][effectSteps[2]](applyTo, parseInt(value));
}

// path => <self/other>/<eff/stat>/<name>

export { generateSideEffectObject };