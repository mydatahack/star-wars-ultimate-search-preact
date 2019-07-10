import {
  UPDATE_SELECTED_CATEGORY,
  UPDATE_SEARCH_KEYWORD,
  UPDATE_PERSON,
  UPDATE_FILM,
  UPDATE_PLANET,
  UPDATE_SPECIES,
  UPDATE_STARSHIP,
  UPDATE_VEHICLE,
} from '../constants/actionTypes'

import {
  PEOPLE,
  FILMS,
  PLANETS,
  SPECIES,
  STARSHIPS
} from '../constants/constantValues'

import { searchByCategory, interateApiCall } from '../utils/api'

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

const updatePerson = (person) => {
  return {
    type: UPDATE_PERSON,
    person
  }
}

const updateFilm = (film) => {
  return {
    type: UPDATE_FILM,
    film
  }
}

const updatePlanet = (planet) => {
  return {
    type: UPDATE_PLANET,
    planet
  }
}

const updateSpecies = (species) => {
  return {
    type: UPDATE_SPECIES,
    species
  }
}

const updateStarship = (starship) => {
  return {
    type: UPDATE_STARSHIP,
    starship
  }
}

const updateVehicle = (vehicle) => {
  return {
    type: UPDATE_VEHICLE,
    vehicle
  }
}

export const submitSearchResult =  (keyword) => {
  return async (dispatch, getState) => {
    try{
      const selectedCategory = getState().information.selectedCategory
      console.log('checking selectedCategory: ', selectedCategory)
      const searchData = await searchByCategory(selectedCategory, keyword)
      console.log('checking searchData ', searchData)
      const transformedData = await interateApiCall(searchData.results[0])
      switch(selectedCategory) {
      case PEOPLE:
        dispatch(updatePerson(transformedData))
        break
      case FILMS:
        dispatch(updateFilm(transformedData))
        break
      case PLANETS:
        dispatch(updatePlanet(transformedData))
        break
      case SPECIES:
        dispatch(updateSpecies(transformedData))
        break
      case STARSHIPS:
        dispatch(updateStarship(transformedData))
        break
      case VEHICLES:
        dispatch(updateVehicle(transformedData))
        break
      }
    } catch(e) {
      console.log(e)
    }
  }
}
