import { expect } from 'chai'
import sinon from 'sinon'

import {
  updateSelectedCategory,
  updateSearchKeyword,
  updateShowAutoSuggestion,
  updateFocusKeywordInput,
  updateSuggestionResults,
  submitSearchResult,
  testAsyncAction
} from '../searchFormAction'

import {
  UPDATE_SELECTED_CATEGORY,
  UPDATE_SEARCH_KEYWORD,
  UPDATE_SEARCH_RESULT,
  UPDATE_FETCHING,
  UPDATE_FAIL,
  UPDATE_SUCCESS,
  UPDATE_SUGGESTIONS,
  UPDATE_FETCHING_SUGGESTION,
  UPDATE_FETCHING_SUGGESTION_SUCCESS,
  UPDATE_FETCHING_SUGGESTION_FAIL,
  UPDATE_STOP_AUTO_SCROLL,
  UPDATE_SHOW_AUTO_SUGGESTION,
  UPDATE_FOCUS_KEYWORD_INPUT
} from '../../constants/actionTypes'

// Setting up mock store
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('searchFormAction.js', () => {

  it('updateSelectedCategory()', () => {
    const expected = {
      type: UPDATE_SELECTED_CATEGORY,
      selectedCategory: 'people'
    }
    expect(updateSelectedCategory('people')).to.deep.equal(expected)
  })

  it('updateSearchKeyword()', () => {
    const expected = {
      type: UPDATE_SEARCH_KEYWORD,
      keyword: 'Luke Skywalker'
    }
    expect(updateSearchKeyword('Luke Skywalker')).to.deep.equal(expected)
  })

  it('updateShowAutoSuggestion()', () => {
    const expected = {
      type: UPDATE_SHOW_AUTO_SUGGESTION,
      showAutoSuggestion: true
    }
    expect(updateShowAutoSuggestion(true)).to.deep.equal(expected)
  })

  it('updateFocusKeywordInput()', () => {
    const expected = {
      type: UPDATE_FOCUS_KEYWORD_INPUT,
      focusKeywordInput: true
    }
    expect(updateFocusKeywordInput(true)).to.deep.equal(expected)
  })

  it('testAsyncAction() - simple redux-thunk action test example', async () => {
    const store = mockStore({
      information: {
        selectedCategory: 'people'
      }
    })

    const expectedAction = [
      {
        type: UPDATE_SUGGESTIONS,
        suggestions: ['suggestion1', 'suggestion2']
      }
    ]

    const getSuggestionStub = sinon.stub().resolves(['suggestion1', 'suggestion2'])

    return store.dispatch(testAsyncAction('keyword', getSuggestionStub)).then(() => {
      // return of async actions
      expect(store.getActions()).to.deep.equal(expectedAction)
    })
  })

  it('updateSuggestionResults() - calling all actions', () => {
    const store = mockStore({
      information: {
        selectedCategory: 'people',
        searchKeyword: '',
        fetchingSuggestion: false,
        fetchingSuggestionSuccess: true,
        fetchingSuggestionFailed: true,
        stopAutoScroll: false,
        showAutoSuggestion: true,
        focusKeywordInput: false,
        suggestions: [],
        searchResult: {}
      }
    })

    const expectedAction = [
      {
        type: UPDATE_SEARCH_KEYWORD,
        keyword: 'new'
      },
      {
        type: UPDATE_STOP_AUTO_SCROLL,
        stopAutoScroll: true
      },
      {
        type: UPDATE_FETCHING_SUGGESTION,
        fetchingSuggestion: true
      },
      {
        type: UPDATE_FETCHING_SUGGESTION_FAIL,
        fetchingSuggestionFail: false
      },
      {
        type: UPDATE_FETCHING_SUGGESTION_SUCCESS,
        fetchingSuggestionSuccess: false
      },
      {
        type: UPDATE_SUGGESTIONS,
        suggestions: ['suggestion1', 'suggestion2']
      },
      {
        type: UPDATE_FETCHING_SUGGESTION,
        fetchingSuggestion: false
      },
      {
        type: UPDATE_FETCHING_SUGGESTION_SUCCESS,
        fetchingSuggestionSuccess: true
      },
    ]

    const getSuggestionStub = sinon.stub().resolves(['suggestion1', 'suggestion2'])

    return store.dispatch(updateSuggestionResults('new', getSuggestionStub)).then(() => {
      // return of async actions
      expect(store.getActions()).to.deep.equal(expectedAction)
    })

  })

  it('updateSuggestionResults() - no AJAX call while fetching', () => {
    const store = mockStore({
      information: {
        selectedCategory: 'people',
        searchKeyword: '',
        fetchingSuggestion: true,
        fetchingSuggestionSuccess: true,
        fetchingSuggestionFailed: true,
        stopAutoScroll: false,
        showAutoSuggestion: true,
        focusKeywordInput: false,
        suggestions: [],
        searchResult: {}
      }
    })

    const expectedAction = [
      {
        type: UPDATE_SEARCH_KEYWORD,
        keyword: 'new'
      },
      {
        type: UPDATE_STOP_AUTO_SCROLL,
        stopAutoScroll: true
      },
      {
        type: UPDATE_FETCHING_SUGGESTION,
        fetchingSuggestion: true
      }
    ]

    return store.dispatch(updateSuggestionResults('new')).then(() => {
      // return of async actions
      expect(store.getActions()).to.deep.equal(expectedAction)
    })

  })

  it('updateSuggestionResults() - AJAX call failed', () => {
    const store = mockStore({
      information: {
        selectedCategory: 'people',
        searchKeyword: '',
        fetchingSuggestion: false,
        fetchingSuggestionSuccess: true,
        fetchingSuggestionFailed: true,
        stopAutoScroll: false,
        showAutoSuggestion: true,
        focusKeywordInput: false,
        suggestions: [],
        searchResult: {}
      }
    })

    const expectedAction = [
      {
        type: UPDATE_SEARCH_KEYWORD,
        keyword: 'new'
      },
      {
        type: UPDATE_STOP_AUTO_SCROLL,
        stopAutoScroll: true
      },
      {
        type: UPDATE_FETCHING_SUGGESTION,
        fetchingSuggestion: true
      },
      {
        type: UPDATE_FETCHING_SUGGESTION_FAIL,
        fetchingSuggestionFail: false
      },
      {
        type: UPDATE_FETCHING_SUGGESTION_SUCCESS,
        fetchingSuggestionSuccess: false
      },
      {
        type: UPDATE_FETCHING_SUGGESTION,
        fetchingSuggestion: false
      }
    ]

    const getSuggestionStub = sinon.stub().rejects(new Error())

    return store.dispatch(updateSuggestionResults('new', getSuggestionStub)).then(() => {
      // return of async actions
      expect(store.getActions()).to.deep.equal(expectedAction)
    })
  })

  it('submitSearchResult() - calling all actions', () => {
    const store = mockStore({
      information: {
        selectedCategory: 'people',
        searchKeyword: 'hello',
        fetching: false,
        apiSuccess: false,
        apiFailed: true,
        stopAutoScroll: true,
        showAutoSuggestion: false,
        focusKeywordInput: false,
        suggestions: [],
        searchResult: {}
      }
    })

    const expectedAction = [
      {
        type: UPDATE_FETCHING,
        fetching: true
      },
      {
        type: UPDATE_FAIL,
        apiFailed: false
      },
      {
        type: UPDATE_FETCHING,
        fetching: false
      },
      {
        type: UPDATE_SUCCESS,
        apiSuccess: true
      },
      {
        type: UPDATE_SEARCH_RESULT,
        searchResult: {data:'data'}
      },
      {
        type: UPDATE_STOP_AUTO_SCROLL,
        stopAutoScroll: false
      }
    ]
    const searchByCategoryStub =
      sinon.stub()
        .withArgs('people', 'hello')
        .resolves({data:'first-data'})
    const actionMapperStub =
    sinon.stub()
      .withArgs('people', {data:'first-data'})
      .resolves({data:'data'})

    return store
      .dispatch(submitSearchResult('new', searchByCategoryStub, actionMapperStub))
      .then(() => {
        // assertion
        expect(store.getActions()).to.deep.equal(expectedAction)
      })
  })

  it('submitSearchResult() - AJAX fail', () => {
    const store = mockStore({
      information: {
        selectedCategory: 'people',
        searchKeyword: 'hello',
        fetching: false,
        apiSuccess: false,
        apiFailed: true,
        stopAutoScroll: true,
        showAutoSuggestion: false,
        focusKeywordInput: false,
        suggestions: [],
        searchResult: {}
      }
    })

    const expectedAction = [
      {
        type: UPDATE_FETCHING,
        fetching: true
      },
      {
        type: UPDATE_FAIL,
        apiFailed: false
      },
      {
        type: UPDATE_FETCHING,
        fetching: false
      },
      {
        type: UPDATE_FAIL,
        apiFailed: true
      }
    ]

    const searchByCategoryStub = sinon.stub().rejects(new Error())
    const actionMapperStub = Function.prototype
    return store
      .dispatch(submitSearchResult('new', searchByCategoryStub, actionMapperStub))
      .then(() => {
        // assertion
        expect(store.getActions()).to.deep.equal(expectedAction)
      })
  })
})
