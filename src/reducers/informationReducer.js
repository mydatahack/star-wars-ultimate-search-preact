import { initialState } from './initialState'
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

const information = (state = initialState.information, action) => {
  switch(action.type) {

  case UPDATE_SELECTED_CATEGORY:
    return Object.assign({}, state, { selectedCategory: action.selectedCategory })

  case UPDATE_SEARCH_KEYWORD:
    return Object.assign({}, state, { searchKeyword: action.keyword })

  case UPDATE_PERSON:
    console.log('inside reducer, checking data...', Object.assign({}, state, { person: action.person }))
    return Object.assign({}, state, { person: action.person })

  case UPDATE_FILM:
    return Object.assign({}, state, { film: action.film })

  case UPDATE_PLANET:
    return Object.assign({}, state, { planet: action.planet })

  case UPDATE_SPECIES:
    return Object.assign({}, state, { species: action.species })

  case UPDATE_STARSHIP:
    return Object.assign({}, state, { starship: action.starship })

  case UPDATE_VEHICLE:
    return Object.assign({}, state, { vehicle: action.vehicle })

  default:
    return state
  }
}

export default information
