module.exports = class SharedExamples {
  constructor () {
    this.examples = {};
    this.createDefineHook = this.createDefineHook.bind(this);
    this.createCallHook = this.createCallHook.bind(this);
  }

  createDefineHook () {
    return (name, example) => {
      if (!name || !example) {
        throw new Error(`invalid arguments for shared examples.`);
      }

      if (this.examples[name]) {
        console.warn(`already defined example "${name}"`);
      }

      this.examples[name] = example;
    };
  }

  createCallHook () {
    return (name, additionalCallback) => {
      if (!name || typeof this.examples[name] !== 'function') {
        throw new Error(`example "${name}" is undefined.`);
      }

      if (additionalCallback) {
        additionalCallback();
      }

      return this.examples[name]();
    };
  }
};
