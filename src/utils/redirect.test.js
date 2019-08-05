import redirect from './redirect';

describe('redirect', () => {
  it('should call history.props with pathname', (done) => {
    const historyPushSpy = sinon.spy();
    const mockHistory = {
      push: historyPushSpy
    };

    redirect.redirectHistory(mockHistory, '/test');
    setTimeout(() => { 
      expect(historyPushSpy).to.have.been.called;
      expect(historyPushSpy).to.have.been.calledWith({
        pathname: '/test'
      });
      done();
    }, 3000);

  });
});
