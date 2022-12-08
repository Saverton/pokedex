import StatusEffect from "./StatusEffect";
import Burn from "./Burn";
import Paralyze from "./Paralyze";
import Poison from "./Poison";
import BadPoison from "./BadPoison";
import Sleep from "./Sleep"
import Frozen from "./Frozen";

function createStatusEffect(type, pkmn) {
  switch (type) {
    case "burn":
      return new Burn(type, pkmn);
    case "paralyze":
      return new Paralyze(type, pkmn);
    case "poison":
      return new Poison(type, pkmn);
    case "bad poison":
      return new BadPoison(type, pkmn);
    case "sleep":
      return new Sleep(type, pkmn);
    case "frozen":
      return new Frozen(type, pkmn);
  }
}

export { createStatusEffect };
