mocha-rspecstyle
=================

mocha-rspecstyle provides `subject` and `val` hooks on mocha like rspec.
(New hooks run on `beforeEach` and `afterEach` hooks.)


Usage
-------

```
mocha --require mocha-rspecstyle --ui rspecstyle
```

### `subject`

```js
const assert = require('assert');

describe('subject sample', () => {
  subject(() => ({ foo: 'abc', bar: 123 }));

  it('check subject value', () => {
    assert.deepEqual(subject(), { foo: 'abc', bar: 123 });
  });

  context('override subject', () => {
    subject(() => ({ foo: 'abc', baz: false }));

    it('check override value', () => {
      assert.deepEqual(subject(), { foo: 'abc', baz: false });
    });
  });
});
```

### `val`

`val` is a `let` of rpsec.

```js
const assert = require('assert');

describe('val sample', () => {
  val('foo', () => ({ foo: 'commonValue', bar: val('bar')}));
  val('bar', 123);

  it('check val value', () => {
    assert.deepEqual(val('foo'), { foo: 'commonValue', bar: 123 });
  });

  context('override value', () => {
    val('foo', 'abc');

    it('check override value', () => {
      assert.equal(val('foo'), 'abc');
    });
  });

  context('override nested value', () => {
    val('bar', () => ({ baz: val('baz') }));
    val('baz', 456);
    
    it('check override value', () => {
      assert.deepEqual(val('foo'), { foo: 'commonValue', bar: { baz: 456 } });
    });

    context('re override nested value', () => {
      val('baz', 789);

      it('check re override value', () => {
        assert.deepEqual(val('foo'), { foo: 'commonValue', bar: { baz: 789 } });
      });
    });
  });
});
```

### `sharedExamples`/`itBehavesLike`

```js
describe('sharedExamples', () => {
  sharedExamples('sharedExamples1', () => {
    it('called shared examples', () => {
      assert(true);
    });
  });

  sharedContext('sharedContext1', () => {
    context('context', () => {
      it('called shared context', () => {
        assert(true);
      });
    });
  });

  itBehavesLike('sharedExamples1');
  includeContext('sharedContext1');

  describe('nested describe', () => {
    includeContext('sharedContext1');
    
    context('nested context', () => {
      itBehavesLike('sharedExamples1');
    });
  });
});
```


#### Alias

- `sharedExamples` ---> `sharedContext` / `shared_examples` / `shared_context`
- `itBehavesLike` ---> `includeContext` / `it_behaves_like` / `include_context`

Full Sample
-----------

(`test/lib/feature.js`)

```js
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
```

Licence
--------

MIT
