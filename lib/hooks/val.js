module.exports.createHook = (beforeHook, afterHook) => {
  let valueMemo = {};

  function getValue (key) {
    const value = valueMemo[key];

    if (typeof value === 'undefined') {
      throw `'${key}' is undefined variable.`;
    }

    if (typeof value !== 'function') {
      return value;
    }

    return value();
  }

  function setValue (key, value) {
    valueMemo[key] = value;
  }

  return (key, value) => {
    if (value !== undefined) {
      beforeHook(() => setValue(key, value));
      afterHook(() => delete valueMemo[key]);
      return null;
    } else {
      return getValue(key, value);
    }
  }
}
