import { initialState } from './initialState'
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

} from '../constants/actionTypes'


const information = (state = initialState.information, action) => {
  switch(action.type) {

  case UPDATE_SELECTED_CATEGORY:
    return Object.assign({}, state, { selectedCategory: action.selectedCategory })

  case UPDATE_SEARCH_KEYWORD:
    return Object.assign({}, state, { searchKeyword: action.keyword })

  case UPDATE_SEARCH_RESULT:
    return { ...state, ...{ searchResult: action.searchResult }}

  case UPDATE_FETCHING:
    return { ...state, ...{ fetching: action.fetching }}

  case UPDATE_SUCCESS:
    return { ...state, ...{ apiSuccess: action.apiSuccess }}

  case UPDATE_FAIL:
    return { ...state, ...{ apiFailed: action.apiFailed }}

  case UPDATE_SUGGESTIONS:
    return { ...state, ...{ suggestions: action.suggestions }}

  case UPDATE_FETCHING_SUGGESTION:
    return { ...state, ...{ fetchingSuggestion: action.fetchingSuggestion }}

  case UPDATE_FETCHING_SUGGESTION_SUCCESS:
    return { ...state, ...{ fetchingSuggestionSuccess: action.fetchingSuggestionSuccess }}

  case UPDATE_FETCHING_SUGGESTION_FAIL:
    return { ...state, ...{ fetchingSuggestionFailed: action.fetchingSuggestionFailed }}

  case UPDATE_STOP_AUTO_SCROLL:
    return { ...state, ...{ stopAutoScroll: action.stopAutoScroll }}

  case UPDATE_SHOW_AUTO_SUGGESTION:
    return { ...state, ...{ showAutoSuggestion: action.showAutoSuggestion }}

  case UPDATE_FOCUS_KEYWORD_INPUT:
    return { ...state, ...{ focusKeywordInput: action.focusKeywordInput }}

  default:
    return state
  }
}

export default information
