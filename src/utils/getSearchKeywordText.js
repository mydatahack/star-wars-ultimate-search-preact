import  {
  FILM_LABEL,
  FILM_PLACEHOLDER,
  PEOPLE_LABEL,
  PEOPLE_PLACEHOLDER,
  PLANET_LABEL,
  PLANET_PLACEHOLDER,
  SPECIES_LABEL,
  SPECIES_PLACEHOLDER,
  STARSHIPS_LABEL,
  STARSHIPS_PLACEHOLDER,
  VEHICLES_LABEL,
  VEHICLES_PLACEHOLDER,
  PEOPLE,
  FILMS,
  PLANETS,
  SPECIES,
  STARSHIPS,
  VEHICLES

} from '../constants/constantValues'

export const getSearchKeywordText = (selectedCategory) => {
  const data = {
    label: null,
    placeholder: null
  }
  switch(selectedCategory) {
  case FILMS:
    data.label = FILM_LABEL
    data.placeholder = FILM_PLACEHOLDER
    break
  case PEOPLE:
    data.label = PEOPLE_LABEL
    data.placeholder = PEOPLE_PLACEHOLDER
    break
  case PLANETS:
    data.label = PLANET_LABEL
    data.placeholder = PLANET_PLACEHOLDER
    break
  case SPECIES:
    data.label = SPECIES_LABEL
    data.placeholder = SPECIES_PLACEHOLDER
    break
  case STARSHIPS:
    data.label = STARSHIPS_LABEL
    data.placeholder = STARSHIPS_PLACEHOLDER
    break
  case VEHICLES:
    data.label = VEHICLES_LABEL
    data.placeholder = VEHICLES_PLACEHOLDER
    break
  default:
    break
  }
  return data
}
