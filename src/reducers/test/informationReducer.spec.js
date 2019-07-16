import { expect } from 'chai'

import { initialState } from '../initialState'

import {
  UPDATE_SELECTED_CATEGORY,
  UPDATE_SEARCH_KEYWORD,
  UPDATE_SEARCH_RESULT,
  UPDATE_FETCHING,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  UPDATE_SUGGESTIONS,
  UPDATE_FETCHING_SUGGESTION,
  UPDATE_FETCHING_SUGGESTION_SUCCESS,
  UPDATE_FETCHING_SUGGESTION_FAIL,
  UPDATE_STOP_AUTO_SCROLL,
  UPDATE_SHOW_AUTO_SUGGESTION,
  UPDATE_FOCUS_KEYWORD_INPUT
} from '../../constants/actionTypes'

import information from '../informationReducer'

describe('informationReducer.js', () => {
  it('information - UPDATE_SELECTED_CATEGORY', () => {
    const action = {
      type: UPDATE_SELECTED_CATEGORY,
      selectedCategory: 'people'
    }
    expect(information(initialState.information, action).selectedCategory).to.equal('people')
  })

  it('information - UPDATE_SEARCH_KEYWORD', () => {
    const action = {
      type: UPDATE_SEARCH_KEYWORD,
      keyword: 'keyword'
    }
    expect(information(initialState.information, action).searchKeyword).to.equal('keyword')
  })

  it('information - UPDATE_SEARCH_RESULT', () => {
    const action = {
      type: UPDATE_SEARCH_RESULT,
      searchResult: {data: 'data'}
    }
    expect(information(initialState.information, action).searchResult).to.deep.equal({data: 'data'})
  })

  it('information - UPDATE_FETCHING', () => {
    const action = {
      type: UPDATE_FETCHING,
      fetching: true
    }
    expect(information(initialState.information, action).fetching).to.equal(true)
  })

  it('information - UPDATE_SUCCESS', () => {
    const action = {
      type: UPDATE_SUCCESS,
      apiSuccess: true
    }
    expect(information(initialState.information, action).apiSuccess).to.equal(true)
  })

  it('information - UPDATE_FAIL', () => {
    const action = {
      type: UPDATE_FAIL,
      apiFailed: true
    }
    expect(information(initialState.information, action).apiFailed).to.equal(true)
  })

  it('information - UPDATE_SUGGESTIONS', () => {
    const action = {
      type: UPDATE_SUGGESTIONS,
      suggestions: ['suggestion1', 'suggestion2']
    }
    expect(information(initialState.information, action).suggestions).to.deep.equal(['suggestion1', 'suggestion2'])
  })

  it('information - UPDATE_FETCHING_SUGGESTION', () => {
    const action = {
      type: UPDATE_FETCHING_SUGGESTION,
      fetchingSuggestion: true
    }
    expect(information(initialState.information, action).fetchingSuggestion).to.equal(true)
  })

  it('information - UPDATE_FETCHING_SUGGESTION_SUCCESS', () => {
    const action = {
      type: UPDATE_FETCHING_SUGGESTION_SUCCESS,
      fetchingSuggestionSuccess: true
    }
    expect(information(initialState.information, action).fetchingSuggestionSuccess).to.equal(true)
  })

  it('information - UPDATE_FETCHING_SUGGESTION_FAIL', () => {
    const action = {
      type: UPDATE_FETCHING_SUGGESTION_FAIL,
      fetchingSuggestionFailed: true
    }
    expect(information(initialState.information, action).fetchingSuggestionFailed).to.equal(true)
  })

  it('information - UPDATE_STOP_AUTO_SCROLL', () => {
    const action = {
      type: UPDATE_STOP_AUTO_SCROLL,
      stopAutoScroll: true
    }
    expect(information(initialState.information, action).stopAutoScroll).to.deep.equal(true)
  })

  it('information - UPDATE_SHOW_AUTO_SUGGESTION', () => {
    const action = {
      type: UPDATE_SHOW_AUTO_SUGGESTION,
      showAutoSuggestion: true
    }
    expect(information(initialState.information, action).showAutoSuggestion).to.deep.equal(true)
  })

  it('information - UPDATE_FOCUS_KEYWORD_INPUT', () => {
    const action = {
      type: UPDATE_FOCUS_KEYWORD_INPUT,
      focusKeywordInput: true
    }
    expect(information(initialState.information, action).focusKeywordInput).to.deep.equal(true)
  })
})

