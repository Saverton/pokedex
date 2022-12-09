class DamageQueue {
  constructor() {
    this._damage = [];
  }

  enqueue(value) {
    if(this._damage.length < 5) {
      this._damage.push(value);
    }
    else {
      this.shiftUp();
      this._damage[this._damage.length - 1] = value;
    }
  }

  shiftUp() {
    const temp = this._damage[0];

    for(let i = 0; i < this._damage.length - 1; i++) {
      this._damage[i] = this._damage[i + 1]
    }

    this._damage[this._damage.length - 1] = 0;
  }

  get damage() {
    return this._damage;
  }
}

export default DamageQueue;