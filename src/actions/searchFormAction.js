import {
  UPDATE_SELECTED_CATEGORY,
  UPDATE_SEARCH_KEYWORD,
  UPDATE_SEARCH_RESULT,
  UPDATE_FETCHING,
  UPDATE_FAIL,
  UPDATE_SUCCESS
} from '../constants/actionTypes'

import {
  PEOPLE,
  FILMS,
  PLANETS,
  SPECIES,
  STARSHIPS
} from '../constants/constantValues'

import { searchByCategory } from '../utils/api'
import { personMapper } from '../utils/mapper'

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

const updateFetching = (fetching) => {
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

export const submitSearchResult =  (keyword) => {
  return async (dispatch, getState) => {

    // Setting API status
    dispatch(updateFetching(true))
    dispatch(updateApiFail(false))

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
        console.log('checking person data: ', searchResult)
        break
      case FILMS:

        break
      case PLANETS:

        break
      case SPECIES:

        break
      case STARSHIPS:

        break
      case VEHICLES:

        break
      }
      dispatch(updateFetching(false))
      dispatch(updateApiSuccess(true))
      dispatch(updateSearchResult(searchResult))
    } catch(e) {
      dispatch(updateFetching(false))
      dispatch(updateApiFail(true))
    }
  }
}
