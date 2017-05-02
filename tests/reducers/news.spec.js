import {
  FETCH_NEWS_POSTS_SUCCESS,
  POST_NEWS_FORM_SUCCESS,
  fetchSuccess,
  fetchNews,
  // postNews,
  // editNews,
  default as newsReducer
} from 'reducers/news'

describe('(Redux Module) news', () => {
  it('Should export a constant FETCH_NEWS_POSTS_SUCCESS', () => {
    expect(FETCH_NEWS_POSTS_SUCCESS).to.equal('FETCH_NEWS_POSTS_SUCCESS')
  });

  it('Should export a constant POST_NEWS_FORM_SUCCESS', () => {
    expect(POST_NEWS_FORM_SUCCESS).to.equal('POST_NEWS_FORM_SUCCESS')
  });

  describe('(Reducer)', () => {
    it('Should be a function', () => {
      expect(newsReducer).to.be.a('function')
    });

    it('Should initialize with an empty array of posts', () => {
      const state = newsReducer(undefined, {});
      expect(state).to.deep.equal(
        { posts: [] }
      );
    });
  });


  describe('(Action) fetchNews', () => {  
    let _globalState
    let _dispatchSpy
    let _getStateSpy

    beforeEach(() => {
      _globalState = {
        posts : newsReducer(undefined, {})
      }
      _dispatchSpy = sinon.spy((action) => {
        _globalState = {
          ..._globalState,
          posts : newsReducer(_globalState.posts, action)
        }
      })
      _getStateSpy = sinon.spy(() => {
        return _globalState
      })
    })

    it('should be exported as a function', () => {
      expect(fetchNews).to.be.a('function');
    });

    it('should return a function (is a thunk)', () => {
      expect(fetchNews()).to.be.a('function')
    })

    // it('Should return a promise from that thunk that gets fulfilled.', () => {
    //   return fetchNews()(_dispatchSpy, _getStateSpy).should.eventually.be.fulfilled
    // })

    // it('Should call dispatch and getState exactly once.', () => {
    //   return fetchNews()(_dispatchSpy, _getStateSpy)
    //     .then(() => {
    //       _dispatchSpy.should.have.been.calledOnce
    //       _getStateSpy.should.have.been.calledOnce
    //     })
    // })

  });

  describe('(Action handler) fetchSuccess', () => {
    it('should be exported as a function', () => {
      expect(fetchSuccess).to.be.a('function');
    });

    it('should return an action with type FETCH_NEWS_POSTS_SUCCESS', () => {
      expect(fetchSuccess()).to.have.property('type', FETCH_NEWS_POSTS_SUCCESS);
    });

    it('should assign the first argument to the payload property', () => {
      const mockData = [ { title: 'something' }, { title: 'test' } ];
      expect(fetchSuccess(mockData)).to.have.property('payload', mockData)
    });

    it('should update state', () => {
      const mockData1 = [ { title: 'something' }, { title: 'test' } ];
      const mockData2 = [ { title: 'hello' }, { title: 'bonjour' } ];
      let state = newsReducer(state, fetchSuccess(mockData1));
      expect(state).to.deep.equal({
        posts: mockData1
      });
      state = newsReducer(state, fetchSuccess(mockData2))
      expect(state).to.deep.equal({
        posts: mockData2
      });
    });
  });
  




  // describe('(Action Creator) increment', () => {
  //   it('Should be exported as a function.', () => {
  //     expect(increment).to.be.a('function')
  //   })

  //   it('Should return an action with type "COUNTER_INCREMENT".', () => {
  //     expect(increment()).to.have.property('type', COUNTER_INCREMENT)
  //   })

  //   it('Should assign the first argument to the "payload" property.', () => {
  //     expect(increment(5)).to.have.property('payload', 5)
  //   })

  //   it('Should default the "payload" property to 1 if not provided.', () => {
  //     expect(increment()).to.have.property('payload', 1)
  //   })
  // })

})
