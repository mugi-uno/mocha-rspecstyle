export default class Val {
  constructor() {
    this.valueMemo = {}
  }

  getValue = (key) => {
    const value = this.valueMemo[key];

    if (typeof value === 'undefined') {
      throw `'${key}' is undefined variable.`;
    }

    if (typeof value !== 'function') {
      return value;
    }

    return value();
  }

  setValue = (key, value) => {
    this.valueMemo[key] = value;
  }

  hook = (key, value) => {
    if (value !== undefined) {
      beforeEach(() => this.setValue(key, value));
      afterEach(() => delete this.valueMemo[key]);
      return null;
    } else {
      return this.getValue(key, value);
    }
  }
}
