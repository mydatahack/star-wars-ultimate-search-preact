import  {
  PEOPLE_SEARCH_URL,
  FILMS_SEARCH_URL,
  PLANETS_SEARCH_URL,
  SPECIES_SEARCH_URL,
  STARSHIPS_SEARCH_URL,
  VEHICLES_SEARCH_URL,
  PEOPLE,
  FILMS,
  PLANETS,
  SPECIES,
  STARSHIPS,
  VEHICLES

} from '../constants/constantValues'

export const searchRequest = (url) => {
  return fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      return data
    })
    .catch((err) => {
      return err
    })
}

const getCategoryUrl = (category) => {
  switch(category) {
  case PEOPLE:
    return PEOPLE_SEARCH_URL
  case FILMS:
    return FILMS_SEARCH_URL
  case PLANETS:
    return PLANETS_SEARCH_URL
  case SPECIES:
    return SPECIES_SEARCH_URL
  case STARSHIPS:
    return STARSHIPS_SEARCH_URL
  case VEHICLES:
    return VEHICLES_SEARCH_URL
  default:
    return null
  }
}

export const searchByCategory = async (category, keyword) => {
  try {
    console.log(getCategoryUrl(category) + keyword)
    const data = await searchRequest(getCategoryUrl(category) + keyword)
    return data
  } catch(e) {
    return e
  }
}

export const doArrayApiCall = (urlArray) => {
  return Promise.all(urlArray.map(url => searchRequest(url)))
    .then(array => array)
    .catch(err => err)
}

export const getSuggestion = async (category, keyword) => {
  try {
    console.log(getCategoryUrl(category) + keyword)
    const data = await searchRequest(getCategoryUrl(category) + keyword)
    let suggestions
    if (category !== FILMS) {
      suggestions = data.results.map((data) => data.name)
    } else {
      suggestions = data.results.map((data) => data.title)
    }
    return suggestions
  } catch(e) {
    return e
  }
}
