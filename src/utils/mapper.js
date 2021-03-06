import { searchRequest, doArrayApiCall } from './api'

import {
  person,
  film,
  planet,
  species,
  starship,
  vehicle
} from './models'

import {
  PEOPLE,
  FILMS,
  PLANETS,
  SPECIES,
  STARSHIPS,
  VEHICLES
} from '../constants/constantValues'

// export const mapper = (response, model) => {

//   for (const key in response) {
//     const responseKey = key
//     for (const key in model) {
//       if (responseKey === key) {
//         model[key] = response[responseKey]
//       }
//     }
//   }
//   return model
// }

export const actionMapper = async (selectedCategory, searchData) => {
  switch(selectedCategory) {
  case PEOPLE:
    return await personMapper(searchData.results[0])

  case FILMS:
    return await filmMapper(searchData.results[0])

  case PLANETS:
    return await planetMapper(searchData.results[0])

  case SPECIES:
    return await speciesMapper(searchData.results[0])

  case STARSHIPS:
    return await starshipMapper(searchData.results[0])

  case VEHICLES:
    return await vehicleMapper(searchData.results[0])
  }
}

// For unit testability - mock func can be passed as option
export const personMapper = async (
  response,
  options={
    searchRequest: searchRequest,
    doArrayApiCall: doArrayApiCall
  }) => {
  // Implementing type guard for the argument
  if (typeof options.searchRequest === 'function' && typeof options.doArrayApiCall === 'function') {
    const searchRequest = options.searchRequest || searchRequest
    const doArrayApiCall = options.doArrayApiCall || doArrayApiCall
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
  } else {
    throw new TypeError('Both options must be function')
  }
  return person
}

export const filmMapper = async (response) => {
  film.resource = FILMS
  film.title = response.title
  film.director = response.director
  film.producer = response.producer
  film.release_date = response.release_date
  film.episode_id = response.episode_id
  film.opening_crawl = response.opening_crawl
  return film
}

export const planetMapper = async (
  response,
  options={
    searchRequest: searchRequest,
    doArrayApiCall: doArrayApiCall
  }) => {
  // Implementing type guard for the argument
  if (typeof options.searchRequest === 'function' && typeof options.doArrayApiCall === 'function') {
    const searchRequest = options.searchRequest || searchRequest
    const doArrayApiCall = options.doArrayApiCall || doArrayApiCall
    planet.resource = PLANETS
    planet.name = response.name
    planet.diameter = response.diameter
    planet.rotation_period = response.rotation_period
    planet.orbital_period = response.orbital_period
    planet.gravity = response.gravity
    planet.population = response.population
    planet.climate = response.climate
    planet.terrain = response.terrain
    planet.surface_water = response.surface_water
    planet.residents = (await doArrayApiCall(response.residents)).map(data => data.name)
    planet.films = (await doArrayApiCall(response.films)).map(data => data.title)
  } else {
    throw new TypeError('Both options must be function')
  }
  return planet
}

export const speciesMapper  = async (
  response,
  options={
    searchRequest: searchRequest,
    doArrayApiCall: doArrayApiCall
  }) => {
  // Implementing type guard for the argument
  if (typeof options.searchRequest === 'function' && typeof options.doArrayApiCall === 'function') {
    const searchRequest = options.searchRequest || searchRequest
    const doArrayApiCall = options.doArrayApiCall || doArrayApiCall
    species.resource = SPECIES
    species.name = response.name
    species.classification = response.classification
    species.designation = response.designation
    species.average_height = response.average_height
    species.average_lifespan = response.average_lifespan
    species.eye_colors = response.eye_colors
    species.hair_colors = response.hair_colors
    species.skin_colors = response.skin_colors
    species.language = response.language
    species.homeworld = (await searchRequest(response.homeworld)).name
    species.people = (await doArrayApiCall(response.people)).map(data => data.name)
    species.films = (await doArrayApiCall(response.films)).map(data => data.title)
  } else {
    throw new TypeError('Both options must be function')
  }
  return species
}

export const starshipMapper = async (
  response,
  options={
    doArrayApiCall: doArrayApiCall
  }) => {
  // Implementing type guard for the argument
  if (typeof options.doArrayApiCall === 'function') {
    const doArrayApiCall = options.doArrayApiCall || doArrayApiCall
    starship.resource = STARSHIPS
    starship.name = response.name
    starship.model = response.model
    starship.starship_class = response.starship_class
    starship.manufacturer = response.manufacturer
    starship.cost_in_credits = response.cost_in_credits
    starship.length = response.length
    starship.crew_to_run_ship = response.crew
    starship.passengers = response.passengers
    starship.max_atmosphering_speed = response.max_atmosphering_speed
    starship.hyperdrive_rating = response.hyperdrive_rating
    starship.MGLT = response.MGLT
    starship.cargo_capacity = response.cargo_capacity
    starship.consumables = response.consumables
    starship.pilots = (await doArrayApiCall(response.pilots)).map(data => data.name)
    starship.films = (await doArrayApiCall(response.films)).map(data => data.title)
  } else {
    throw new TypeError('Option must be function')
  }
  return starship
}

export const vehicleMapper= async (
  response,
  options={
    doArrayApiCall: doArrayApiCall
  }) => {
  // Implementing type guard for the argument
  if (typeof options.doArrayApiCall === 'function') {
    const doArrayApiCall = options.doArrayApiCall || doArrayApiCall
    vehicle.resource = VEHICLES
    vehicle.name = response.name
    vehicle.model = response.model
    vehicle.manufacturer = response.manufacturer
    vehicle.vehicle_class = response.vehicle_class
    vehicle.length = response.length
    vehicle.cost_in_credits = response.cost_in_credits
    vehicle.crew_to_run_ship = response.crew
    vehicle.passengers = response.passengers
    vehicle.max_atmosphering_speed = response.max_atmosphering_speed
    vehicle.cargo_capacity = response.cargo_capacity
    vehicle.consumables = response.consumables
    vehicle.pilots = (await doArrayApiCall(response.pilots)).map(data => data.name)
    vehicle.films = (await doArrayApiCall(response.films)).map(data => data.title)
  } else {
    throw new TypeError('Option must be function')
  }
  return vehicle
}
