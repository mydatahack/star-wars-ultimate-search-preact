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

import { searchByCategory, getSuggestion } from '../utils/api'
import {
  personMapper,
  filmMapper,
  planetMapper,
  speciesMapper,
  starshipMapper,
  vehicleMapper
} from '../utils/mapper'

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

export const updateSuggestionResults = (keyword) => async (dispatch, getState) => {

  dispatch(updateSearchKeyword(keyword))
  console.log(keyword, !keyword.length)

  // stop auto scroll
  if (!getState().information.stopAutoScroll) {
    dispatch(updateStopAutoScroll(true))
  }

  if (keyword.length) {

    // setting API status
    dispatch(updateFetchingSuggestion(true))

    // make sure to fire only one api call
    const isFetching = getState().information.fetchingSuggestion
    if (isFetching) {

      // first reset fetchingSuggestionFail
      if (getState().information.fetchingSuggestionFail) {
        dispatch(updateFetchingSuggesionFail(false))
      }

      // then, reset fetchingSuggestionSuccess
      if (getState().information.fetchingSuggestionSuccess) {
        dispatch(updateFetchingSuggestionSuccess(false))
      }

      // call api and update suggestions array
      try {
        const selectedCategory = getState().information.selectedCategory
        const suggestions = await getSuggestion(selectedCategory, keyword)
        // console.log('checking suggestions, ', suggestions)
        dispatch(updateSuggestions(suggestions))
        dispatch(updateFetchingSuggestion(false))
        dispatch(updateFetchingSuggestionSuccess(true))
      } catch(e) {
        dispatch(updateFetchingSuggestion(false))
      }
    } else {
    // if still fetchingSuggestion, don't do any AJAX call.
      dispatch(updateSearchKeyword(keyword))
    }
  }
}

export const submitSearchResult =  (keyword) => {
  return async (dispatch, getState) => {

    // Setting API status
    dispatch(updateFetching(true))
    if(getState().information.apiFailed) {
      dispatch(updateApiFail(false))
    }

    // Start API
    try {
      const selectedCategory = getState().information.selectedCategory
      console.log('checking selectedCategory: ', selectedCategory)
      const searchData = await searchByCategory(selectedCategory, keyword)
      console.log('checking searchData ', searchData)

      // searchResult to be passed into action
      let searchResult

      switch(selectedCategory) {
      case PEOPLE:
        searchResult = await personMapper(searchData.results[0])
        break
      case FILMS:
        searchResult = await filmMapper(searchData.results[0])
        break
      case PLANETS:
        searchResult = await planetMapper(searchData.results[0])
        break
      case SPECIES:
        searchResult = await speciesMapper(searchData.results[0])
        break
      case STARSHIPS:
        searchResult = await starshipMapper(searchData.results[0])
        break
      case VEHICLES:
        searchResult = await vehicleMapper(searchData.results[0])
        break
      }
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
}
