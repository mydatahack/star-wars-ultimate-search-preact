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

} from '../../constants/constantValues'

import { expect } from 'chai'
import { getSearchKeywordText } from '../getSearchKeywordText'

describe('getSearchKeywordText()', () => {
  it('Films', () => {
    const expected = {
      label: FILM_LABEL,
      placeholder: FILM_PLACEHOLDER
    }
    expect(getSearchKeywordText(FILMS)).to.deep.equal(expected)
  })

  it('Pepole', () => {
    const expected = {
      label: PEOPLE_LABEL,
      placeholder: PEOPLE_PLACEHOLDER
    }
    expect(getSearchKeywordText(PEOPLE)).to.deep.equal(expected)
  })

  it('Planets', () => {
    const expected = {
      label: PLANET_LABEL,
      placeholder: PLANET_PLACEHOLDER
    }
    expect(getSearchKeywordText(PLANETS)).to.deep.equal(expected)
  })

  it('Species', () => {
    const expected = {
      label: SPECIES_LABEL,
      placeholder: SPECIES_PLACEHOLDER
    }
    expect(getSearchKeywordText(SPECIES)).to.deep.equal(expected)
  })

  it('Starships', () => {
    const expected = {
      label: STARSHIPS_LABEL,
      placeholder: STARSHIPS_PLACEHOLDER
    }
    expect(getSearchKeywordText(STARSHIPS)).to.deep.equal(expected)
  })

  it('Vehicles', () => {
    const expected = {
      label: VEHICLES_LABEL,
      placeholder: VEHICLES_PLACEHOLDER
    }
    expect(getSearchKeywordText(VEHICLES)).to.deep.equal(expected)
  })

})
