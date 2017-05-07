const fizzbuzz = (value) => {
  if (value % 15 === 0) return 'FizzBuzz';
  if (value % 3 === 0) return 'Fizz';
  if (value % 5 === 0) return 'Buzz';
  return `${value}`;
}

describe('FizzBuzz', () => {
  subject(() => fizzbuzz(val('value')));

  sharedExamples('returned Fizz', () => {
    it('return Fizz', () => {
      assert.equal(subject(), 'Fizz');
    });
  });

  sharedExamples('returned Buzz', () => {
    it('return Buzz', () => {
      assert.equal(subject(), 'Buzz');
    });
  });

  sharedExamples('returned FizzBuzz', () => {
    it('return Buzz', () => {
      assert.equal(subject(), 'FizzBuzz');
    });
  });

  sharedExamples('returned value string', () => {
    it('return value string', () => {
      assert.equal(subject(), `${val('value')}`);
    });
  });

  sharedContext('FizzBuzz cycle', () => {
    context('1 * cycle', () => {
      itBehavesLike('returned value string', () => val('value', () => 1 * val('cycle')));
    });
    context('2 * cycle', () => {
      itBehavesLike('returned value string', () => val('value', () => 2 * val('cycle')));
    });
    context('3 * cycle', () => {
      itBehavesLike('returned Fizz', () => val('value', () => 3 * val('cycle')));
    });
    context('4 * cycle', () => {
      itBehavesLike('returned value string', () => val('value', () => 4 * val('cycle')));
    });
    context('5 * cycle', () => {
      itBehavesLike('returned Buzz', () => val('value', () => 5 * val('cycle')));
    });
    context('6 * cycle', () => {
      itBehavesLike('returned Fizz', () => val('value', () => 6 * val('cycle')));
    });
    context('7 * cycle', () => {
      itBehavesLike('returned value string', () => val('value', () => 7 * val('cycle')));
    });
    context('8 * cycle', () => {
      itBehavesLike('returned value string', () => val('value', () => 8 * val('cycle')));
    });
    context('9 * cycle', () => {
      itBehavesLike('returned Fizz', () => val('value', () => 9 * val('cycle')));
    });
    context('10 * cycle', () => {
      itBehavesLike('returned Buzz', () => val('value', () => 10 * val('cycle')));
    });
    context('11 * cycle', () => {
      itBehavesLike('returned value string', () => val('value', () => 11 * val('cycle')));
    });
    context('12 * cycle', () => {
      itBehavesLike('returned Fizz', () => val('value', () => 12 * val('cycle')));
    });
    context('13 * cycle', () => {
      itBehavesLike('returned value string', () => val('value', () => 13 * val('cycle')));
    });
    context('14 * cycle', () => {
      itBehavesLike('returned value string', () => val('value', () => 14 * val('cycle')));
    });
    context('15 * cycle', () => {
      itBehavesLike('returned FizzBuzz', () => val('value', () => 15 * val('cycle')));
    });
  });


  describe('1〜15', () => {
    includeContext('FizzBuzz cycle', () => val('cycle', 1));
  });
  describe('16〜30', () => {
    includeContext('FizzBuzz cycle', () => val('cycle', 2));
  });
});
