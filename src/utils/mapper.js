import { searchRequest, doArrayApiCall } from './api'
import { person } from './models'
import {
  PEOPLE,
  FILMS,
  PLANETS,
  SPECIES,
  STARSHIPS,
  VEHICLES
} from '../constants/constantValues'

export const mapper = (response, model) => {

  for (const key in response) {
    const responseKey = key
    for (const key in model) {
      if (responseKey === key) {
        model[key] = response[responseKey]
      }
    }
  }
  return model
}

export const personMapper = async (response) => {

  person.resource = PEOPLE
  person.name = response.name
  person.homeworld = (await searchRequest(response.homeworld)).name
  person.starships = (await doArrayApiCall(response.starships)).map(data => data.name)
  person.vehicles = (await doArrayApiCall(response.vehicles)).map(data => data.name)
  person.height = response.height
  person.mass = response.mass
  person.hair_color = response.hair_color
  person.eye_color = response.eye_color
  person.birth_year = response.birth_year
  person.gender = response.gender
  person.films = (await doArrayApiCall(response.films)).map(data => data.title)

  return person
}



