const Subject = require('./subject');
const Val = require('./val');

const subjectInstance = new Subject();
const valInstance = new Val();

module.exports.subject = (...args) => subjectInstance.hook(...args);
module.exports.val = (...args) => valInstance.hook(...args);
