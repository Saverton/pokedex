import StatusEffect from "./StatusEffect";
import Burn from "./Burn";
import Paralyze from "./Paralyze";
import Poison from "./Poison";
import BadPoison from "./BadPoison";
import Sleep from "./Sleep"
import Frozen from "./Frozen";
import Confusion from "./Confusion";

function createStatusEffect(type, pkmn) {
  switch (type) {
    case "brn":
      return new Burn(type, pkmn);
    case "prz":
      return new Paralyze(type, pkmn);
    case "psn":
      return new Poison(type, pkmn);
    case "badpsn":
      return new BadPoison(type, pkmn);
    case "slp":
      return new Sleep(type, pkmn);
    case "frz":
      return new Frozen(type, pkmn);
    case "cnf":
      return new Confusion(type, pkmn);
    default:
      return new StatusEffect(type, pkmn);
  }
}

export { createStatusEffect };
