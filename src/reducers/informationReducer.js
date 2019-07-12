import { initialState } from './initialState'
import {
  UPDATE_SELECTED_CATEGORY,
  UPDATE_SEARCH_KEYWORD,
  UPDATE_SEARCH_RESULT,
  UPDATE_FETCHING,
  UPDATE_SUCCESS,
  UPDATE_FAIL,

} from '../constants/actionTypes'


const information = (state = initialState.information, action) => {
  switch(action.type) {

  case UPDATE_SELECTED_CATEGORY:
    return Object.assign({}, state, { selectedCategory: action.selectedCategory })

  case UPDATE_SEARCH_KEYWORD:
    return Object.assign({}, state, { searchKeyword: action.keyword })

  case UPDATE_SEARCH_RESULT:
    console.log('inside reducer, checking data...', Object.assign({}, state, { person: action.searchResult }))
    return { ...state, ...{ searchResult: action.searchResult }}

  case UPDATE_FETCHING:
    return { ...state, ...{ fetching: action.fetching }}

  case UPDATE_SUCCESS:
    return { ...state, ...{ apiSuccess: action.apiSuccess }}

  case UPDATE_FAIL:
    return { ...state, ... { apiFailed: action.apiFailed}}
  default:
    return state
  }
}

export default information
