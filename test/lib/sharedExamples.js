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
