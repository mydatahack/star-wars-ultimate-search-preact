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
} from '../constants/actionTypes'

import {
  PEOPLE,
  FILMS,
  PLANETS,
  SPECIES,
  STARSHIPS,
  VEHICLES
} from '../constants/constantValues'

import { actionMapper } from '../utils/mapper'
import { getSuggestion, searchByCategory } from '../utils/api'

export const updateSelectedCategory = (selectedCategory) => {
  return {
    type: UPDATE_SELECTED_CATEGORY,
    selectedCategory
  }
}

export const updateSearchKeyword = (keyword) => {
  return {
    type: UPDATE_SEARCH_KEYWORD,
    keyword
  }
}

const updateSearchResult = (searchResult) => {
  return {
    type: UPDATE_SEARCH_RESULT,
    searchResult
  }
}

const updateFetching= (fetching) => {
  return {
    type: UPDATE_FETCHING,
    fetching
  }
}

const updateApiSuccess = (apiSuccess) => {
  return {
    type: UPDATE_SUCCESS,
    apiSuccess
  }
}

const updateApiFail = (apiFailed) => {
  return {
    type: UPDATE_FAIL,
    apiFailed
  }
}

const updateSuggestions = (suggestions) => {
  return {
    type: UPDATE_SUGGESTIONS,
    suggestions
  }
}

const updateFetchingSuggestionSuccess = (fetchingSuggestionSuccess) => {
  return {
    type: UPDATE_FETCHING_SUGGESTION_SUCCESS,
    fetchingSuggestionSuccess
  }
}
const updateFetchingSuggestion= (fetchingSuggestion) => {
  return {
    type: UPDATE_FETCHING_SUGGESTION,
    fetchingSuggestion
  }
}

const updateFetchingSuggesionFail = (fetchingSuggestionFail) => {
  return {
    type: UPDATE_FETCHING_SUGGESTION_FAIL,
    fetchingSuggestionFail
  }
}

const updateStopAutoScroll = (stopAutoScroll) => {
  return {
    type: UPDATE_STOP_AUTO_SCROLL,
    stopAutoScroll
  }
}

export const updateShowAutoSuggestion = (showAutoSuggestion) => {
  return {
    type: UPDATE_SHOW_AUTO_SUGGESTION,
    showAutoSuggestion
  }
}

export const updateFocusKeywordInput = (focusKeywordInput) => {
  return {
    type: UPDATE_FOCUS_KEYWORD_INPUT,
    focusKeywordInput
  }
}

// this is for simple unit test example for redux-thunk action
export const testAsyncAction = (keyword, getSuggestionFunc=getSuggestion) => async (dispatch, getState) => {

  try {
    const selectedCategory = getState().information.selectedCategory
    const suggestions = await getSuggestionFunc(selectedCategory, keyword)
    dispatch(updateSuggestions(suggestions))
  } catch(e) {
    console.log(e)
  }
}

export const updateSuggestionResults =
(
  keyword,
  getSuggestionFunc=getSuggestion
) => async (dispatch, getState) => {

  dispatch(updateSearchKeyword(keyword))
  // console.log(keyword, !keyword.length)

  // stop auto scroll
  if (!getState().information.stopAutoScroll) {
    dispatch(updateStopAutoScroll(true))
  }

  if (keyword.length) {
    // checking current fetching status
    // if it is false, it goes fetching
    const isFetching = getState().information.fetchingSuggestion

    // setting API status
    dispatch(updateFetchingSuggestion(true))

    // make sure to fire only one api call
    if (!isFetching) {

      // first reset fetchingSuggestionF ail
      if (getState().information.fetchingSuggestionFailed) {
        dispatch(updateFetchingSuggesionFail(false))
      }

      // then, reset fetchingSuggestionSuccess
      if (getState().information.fetchingSuggestionSuccess) {
        dispatch(updateFetchingSuggestionSuccess(false))
      }

      // call api and update suggestions array
      try {
        const selectedCategory = getState().information.selectedCategory
        // console.log('executing getStuggestion()')
        const suggestions = await getSuggestionFunc(selectedCategory, keyword)
        // console.log('checking suggestions, ', suggestions)
        dispatch(updateSuggestions(suggestions))
        dispatch(updateFetchingSuggestion(false))
        dispatch(updateFetchingSuggestionSuccess(true))
      } catch(e) {
        dispatch(updateFetchingSuggestion(false))
      }
    }
  }
}

export const submitSearchResult =
(
  keyword,
  searchByCategoryFunc=searchByCategory,
  actionMapperFunc=actionMapper
) => async (dispatch, getState) => {

  // Setting API status
  dispatch(updateFetching(true))
  if(getState().information.apiFailed) {
    dispatch(updateApiFail(false))
  }

  // Start API
  try {
    const selectedCategory = getState().information.selectedCategory
    console.log('checking selectedCategory: ', selectedCategory)
    const searchData = await searchByCategoryFunc(selectedCategory, keyword)
    console.log('checking searchData ', searchData)

    // get searchResult data
    const searchResult = await actionMapperFunc(selectedCategory, searchData)

    dispatch(updateFetching(false))
    dispatch(updateApiSuccess(true))
    dispatch(updateSearchResult(searchResult))
    // enabling auto scroll
    if (getState().information.stopAutoScroll) {
      dispatch(updateStopAutoScroll(false))
    }
  } catch(e) {
    console.log(e)
    dispatch(updateFetching(false))
    dispatch(updateApiFail(true))
  }
}

