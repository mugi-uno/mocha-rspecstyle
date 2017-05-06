module.exports = class Val {
  constructor() {
    this.valueMemo = {};
    this.createHook = this.createHook.bind(this);
  }

  getValue (key) {
    const value = this.valueMemo[key];

    if (typeof value === 'undefined') {
      throw `'${key}' is undefined variable.`;
    }

    if (typeof value !== 'function') {
      return value;
    }

    return value();
  }

  setValue (key, value) {
    this.valueMemo[key] = value;
  }

  createHook (beforeHook, afterHook) {
    return (key, value) => {
      if (value !== undefined) {
        beforeHook(() => this.setValue(key, value));
        afterHook(() => delete this.valueMemo[key]);
        return null;
      } else {
        return this.getValue(key, value);
      }
    }
  }
}
