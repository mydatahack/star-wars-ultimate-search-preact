// import nock from 'nock'
import { expect } from 'chai'
import sinon from 'sinon'

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

} from '../../constants/constantValues'

import {
  searchRequest,
  searchByCategory,
  doArrayApiCall,
  getSuggestion,
  getCategoryUrl
} from '../api'

describe('api.js', () => {
  describe('searchRequest()', () => {
    it('should return the correct response', async () => {
      global.fetch = sinon
        .stub()
        .withArgs('star-wars.api') // todo: withArgs is not working, need to investigate
        .resolves({
          json: () => {return {data:'hello'}}
        })

      const data = await searchRequest('star-wars.api')
      expect(data).to.deep.equal({data:'hello'})
    })

    it('should should handle error', async () => {
      global.fetch = sinon
        .stub()
        .withArgs('star-wars.api')
        .resolves({
          json: () => {return new Error('error')}
        })
      const data = await searchRequest('star-wars.api')
      expect(data.message).to.deep.equal('error')
    })
  })

  describe('doArrayApiCall()', () => {
    it('should return array of data', async () => {
      global.fetch = sinon
        .stub()
        .resolves({
          json: () => {return 'data'}
        })
      const array = await doArrayApiCall([1, 2, 3])
      expect(array).to.deep.equal(['data', 'data', 'data'])
    })
    it('should handle error', async () => {
      global.fetch = sinon
        .stub()
        .resolves({
          json: () => {return new Error('error')}
        })
      const data = await doArrayApiCall([1, 2, 3])
      expect(data[0].message).to.equal('error')
      expect(data[1].message).to.equal('error')
      expect(data[2].message).to.equal('error')
    })
  })

  describe('doArrayApiCall()', () => {
    it('should return array of data', async () => {
      global.fetch = sinon
        .stub()
        .resolves({
          json: () => {return 'data'}
        })
      const array = await doArrayApiCall([1, 2, 3])
      expect(array).to.deep.equal(['data', 'data', 'data'])
    })
    it('should handle error', async () => {
      global.fetch = sinon
        .stub()
        .resolves({
          json: () => {return new Error('error')}
        })
      const data = await doArrayApiCall([1, 2, 3])
      expect(data[0].message).to.equal('error')
      expect(data[1].message).to.equal('error')
      expect(data[2].message).to.equal('error')
    })
  })

  describe('getSuggestion()', () => {
    it('should return correct value for the category film', async () => {

      const returnDataArray = {
        results: [
          {
            title: 'suggestion1'
          },
          {
            title: 'suggestion2'
          }
        ]
      }

      global.fetch = sinon
        .stub()
        .resolves({
          json: () => {return returnDataArray}
        })

      const suggestions = await getSuggestion(FILMS, 'hello')
      expect(suggestions).to.deep.equal(['suggestion1', 'suggestion2'])
    })

    it('should return correct value for non film category', async () => {

      const returnDataArray = {
        results: [
          {
            name: 'suggestion1'
          },
          {
            name: 'suggestion2'
          }
        ]
      }

      global.fetch = sinon
        .stub()
        .resolves({
          json: () => {return returnDataArray}
        })

      const suggestions = await getSuggestion(PEOPLE, 'hello')
      expect(suggestions).to.deep.equal(['suggestion1', 'suggestion2'])
    })

    it('should handle error', async () => {
      global.fetch = sinon
        .stub()
        .resolves({
          json: () => {new Error('error')}
        })

      const suggestions = await getSuggestion(PEOPLE, 'hello')
      expect(!suggestions.message).to.be.false
    })
  })
  describe('getCategoryUrl()', () => {
    it('PEOPLE - return correct url', ()=> {
      expect(getCategoryUrl(PEOPLE))
        .to.equal(PEOPLE_SEARCH_URL)
    })
    it('FILMS - return correct url', ()=> {
      expect(getCategoryUrl(FILMS))
        .to.equal(FILMS_SEARCH_URL)
    })
    it('PLANETS - return correct url', ()=> {
      expect(getCategoryUrl(PLANETS))
        .to.equal(PLANETS_SEARCH_URL)
    })
    it('SPECIES - return correct url', ()=> {
      expect(getCategoryUrl(SPECIES))
        .to.equal(SPECIES_SEARCH_URL)
    })
    it('STARSHIPS - return correct url', ()=> {
      expect(getCategoryUrl(STARSHIPS))
        .to.equal(STARSHIPS_SEARCH_URL)
    })
    it('VEHICLES - return correct url', ()=> {
      expect(getCategoryUrl(VEHICLES))
        .to.equal(VEHICLES_SEARCH_URL)
    })
    it('default - return null', ()=> {
      expect(getCategoryUrl('default'))
        .to.be.null
    })
  })
})
