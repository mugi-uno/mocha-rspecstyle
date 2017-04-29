class Subject {
  constructor() {
    this.subjectMemo = null;
  }

  hook (callback) {
    if (typeof callback === 'undefined') {
      if (typeof this.subjectMemo === 'undefined') {
        throw `subject is undefined.`;
      }

      if (typeof this.subjectMemo === 'function') {
        return this.subjectMemo();
      }

      return this.subjectMemo;
    }

    beforeEach(() => { this.subjectMemo = callback });
    afterEach(() => { this.subjectMemo = undefined });
  }
}

module.exports = Subject;
