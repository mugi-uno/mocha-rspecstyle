module.exports = class Subject {
  constructor() {
    this.subjectMemo = undefined;
    this.createHook = this.createHook.bind(this);
  }

  createHook (beforeHook, afterHook) {
    return (callback) => {
      if (typeof callback === 'undefined') {
        if (typeof this.subjectMemo === 'undefined') {
          throw `subject is undefined.`;
        }

        if (typeof this.subjectMemo === 'function') {
          return this.subjectMemo();
        }

        return this.subjectMemo;
      }

      beforeHook(() => { this.subjectMemo = callback });
      afterHook(() => { this.subjectMemo = undefined });
    }
  }
}
