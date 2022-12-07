class Move {
  constructor(moveObj) {
    this.name = moveObj.name;
    this.type = moveObj.type;
    this.category = moveObj.stats.category;
    this.power = moveObj.stats.power;
    this.accuracy = moveObj.stats.accuracy;
    this.pp = moveObj.stats.pp;
    this.effect = moveObj.stats.effect;
  }

  isAttack() {
    return !this.category === "status";
  }

  priority() {
    if (this.name === "Quick Attack") {
      return 1;
    } else if (this.name === "Counter") {
      return -1;
    }

    return 0;
  }

  moveLength() {
    if (this.name === "Bide") return 3;
    else if (
      this.name === "Fly" ||
      this.name === "Dig" ||
      this.name === "Skull Bash" ||
      this.name === "Sky Attack" ||
      this.name === "Solar Beam" ||
      this.name === "Counter"
    )
      return 2;
    else return 1;
  }
}

export default Move;
