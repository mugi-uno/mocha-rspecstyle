describe('hooks', () => {
  subject(() => val('value1'));

  val('value1', () => ({
    commonValue: '123',
    value2: val('value2')
  }));

  val('value2', '456');

  context('default value', () => {
    it('use default values of "subject" and "val"', () => {
      assert.deepEqual(subject(), {
        commonValue: '123',
        value2: '456'
      });
    });
  });

  context('override subject hook', () => {
    context('callback function', () => {
      subject('new subject');
      it ('use override value', () => {
        assert(subject() === 'new subject');
      });
    });

    context('not callback function', () => {
      subject(() => 'new subject callback value');
      it ('use override value', () => {
        assert(subject() === 'new subject callback value');
      });
    });
  });

  context('override val hook', () => {
    context('callback function', () => {
      val('value1', () => ({
        numberValue: 100,
        stringValue: 'abc'
      }));
      it ('use override value', () => {
        assert.deepEqual(subject(), {
          numberValue: 100,
          stringValue: 'abc'
        });
      });
    });

    context('not callback function', () => {
      val('value1', {
        numberValue: 200,
        stringValue: 'def'
      });
      it ('use override value', () => {
        assert.deepEqual(subject(), {
          numberValue: 200,
          stringValue: 'def'
        });
      });
    });
  });

  context('override nested val hook', () => {
    context('callback function', () => {
      val('value2', () => ({
        value3: '789'
      }));
      it ('use override value', () => {
        assert.deepEqual(subject(), {
          commonValue: '123',
          value2: {
            value3: '789'
          }
        });
      });
    });

    context('not callback function', () => {
      val('value2', ({
        value4: '1000'
      }));
      it ('use override value', () => {
        assert.deepEqual(subject(), {
          commonValue: '123',
          value2: {
            value4: '1000'
          }
        });
      });
    });
  });
});