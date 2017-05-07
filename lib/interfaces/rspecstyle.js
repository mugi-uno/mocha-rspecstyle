const Mocha = require('mocha');
const Subject = require('../hooks/subject');
const Val = require('../hooks/val');
const SharedExamples = require('../hooks/sharedExamples');

module.exports = function (suite) {
  const suites = [suite];
  const subject = new Subject();
  const val = new Val();
  const sharedExamples = new SharedExamples();

  suite.on('pre-require', function (context, file, mocha) {
    const common = require('mocha/lib/interfaces/common')(suites, context, mocha);

    context.before = common.before;
    context.after = common.after;
    context.beforeEach = common.beforeEach;
    context.afterEach = common.afterEach;
    context.run = mocha.options.delay && common.runWithSuite(suite);

    context.describe = context.context = function (title, fn) {
      return common.suite.create({
        title: title,
        file: file,
        fn: fn
      });
    };

    context.xdescribe = context.xcontext = context.describe.skip = function (title, fn) {
      return common.suite.skip({
        title: title,
        file: file,
        fn: fn
      });
    };

    context.describe.only = function (title, fn) {
      return common.suite.only({
        title: title,
        file: file,
        fn: fn
      });
    };

    context.it = context.specify = function (title, fn) {
      const suite = suites[0];
      if (suite.isPending()) {
        fn = null;
      }
      const test = new Mocha.Test(title, fn);
      test.file = file;
      suite.addTest(test);
      return test;
    };

    context.it.only = function (title, fn) {
      return common.test.only(mocha, context.it(title, fn));
    };

    context.xit = context.xspecify = context.it.skip = function (title) {
      context.it(title);
    };

    context.it.retries = function (n) {
      context.retries(n);
    };

    // custom hooks
    context.subject = subject.createHook(context.beforeEach, context.afterEach);
    context.val = val.createHook(context.beforeEach, context.afterEach);
    context.sharedExamples = context.sharedContext = context.shared_examples = context.shared_context = sharedExamples.createDefineHook();
    context.itBehavesLike = context.includeContext = context.it_behaves_like = context.include_context = sharedExamples.createCallHook();
  });
};
