module.exports.createHook = (beforeHook, afterHook) => {
  let subjectMemo = null;

  return (callback) => {
    if (typeof callback === 'undefined') {
      if (typeof subjectMemo === 'undefined') {
        throw `subject is undefined.`;
      }

      if (typeof subjectMemo === 'function') {
        return subjectMemo();
      }

      return subjectMemo;
    }

    beforeHook(() => { subjectMemo = callback });
    afterHook(() => { subjectMemo = undefined });
  }
}
