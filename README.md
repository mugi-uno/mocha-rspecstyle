mocha-rspecstyle
=================

mocha-rspecstyle provides `subject` and `val` hooks on mocha like rspec.
(New hooks run on `beforeEach` and `afterEach` hooks.)


Usage
-------

```
mocha --ui rspecstyle
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


Licence
--------

MIT