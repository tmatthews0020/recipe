// Lightweight faker utilities for k6 load testing
// k6 doesn't support npm packages, so we create custom helpers

export class BaseFaker {
  constructor(seed = null) {
    this.seed = seed || Date.now();
    this.random = this.seed;
  }

  // Simple seeded random number generator
  _random() {
    const x = Math.sin(this.random++) * 10000;
    return x - Math.floor(x);
  }

  randomInt(min, max) {
    return Math.floor(this._random() * (max - min + 1)) + min;
  }

  randomFloat(min, max, decimals = 2) {
    const value = this._random() * (max - min) + min;
    return parseFloat(value.toFixed(decimals));
  }

  randomElement(array) {
    return array[Math.floor(this._random() * array.length)];
  }

  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = this._random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  personName() {
    const firstNames = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'James'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    return `${this.randomElement(firstNames)} ${this.randomElement(lastNames)}`;
  }
}
