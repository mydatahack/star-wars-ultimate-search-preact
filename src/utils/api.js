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
  STARSHIPS

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

export const interateApiCall = async (response) => {

  for (const key in response) {
    // check to see if data point is array or not
    if(Array.isArray(response[key])) {
      const urlArray = response[key]

      // if array, get url and replace the data with api call
      urlArray.forEach(async (url, index) => {

        const data = await searchRequest(url)
        if (key == 'films') {
          response[key][index] = data.title
        } else {
          response[key][index] = data.name
        }
      })
    // handling non array case
    } else if (key === 'homeworld') {
      const url = response[key]
      const data = await searchRequest(url)
      response[key] = data.name
    }
  }
  return response
}
