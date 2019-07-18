import { expect } from 'chai'
import sinon from 'sinon'

import {
  actionMapper,
  personMapper,
  filmMapper,
  planetMapper,
  speciesMapper,
  starshipMapper,
  vehicleMapper
} from '../mapper'

describe('mapper.js', () => {
  it('personMapper() - mapping correctly', async () => {
    const response = {
      name: 'name',
      homeworld: 'homeworld-url',
      starships: ['starships-url'],
      vehicles: ['vehicles-url'],
      height: 100,
      mass: 50,
      hair_color: 'red',
      eye_color: 'blue',
      birth_year: '13BC',
      gender: 'male',
      films: ['film-url']
    }
    const searchResultStub = sinon.stub()
      .withArgs('homeworld-url').resolves({name: 'homeworld'})
    const doArrayApiCallStub = sinon.stub()
      .resolves([
        {name: 'name1', title: 'title1'},
        {name: 'name2', title: 'title2'},
        {name: 'name3', title: 'title3'}
      ])
    // These do not work
      // .withArgs(['starships-url']).resolves([{name: 'starship1'}, {name: 'starship2'}])
      // .withArgs(['vehicles-url']).resolves([{name: 'vehicle'}])
      // .withArgs(['film-url']).resolves([{title: 'film'}])
    const expected = response
    expected.homeworld = 'homeworld'
    expected.starships = ['name1', 'name2', 'name3']
    expected.vehicles = ['name1', 'name2', 'name3']
    expected.films = ['title1', 'title2', 'title3']
    expected.resource = 'people'

    const mappedObj = await personMapper(
      response,
      {
        searchRequest: searchResultStub,
        doArrayApiCall: doArrayApiCallStub,
      }
    )
    expect(mappedObj).to.deep.equal(expected)
  })

  it('personMapper() - handles error when function input is wrong', async () => {

    try {
      const mappedObj = await personMapper(
        {response: 'response'},
        {
          searchRequest: 'hello',
          doArrayApiCall: () => {},
        }
      )
    } catch (e) {
      expect(e.message).to.deep.equal('Both options must be function')
    }
  })

  it('filmMapper() - mapping correctly', async () => {
    const response = {
      'title': 'A New Hope',
      'episode_id': 4,
      'opening_crawl': 'It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire\'s\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire\'s\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....',
      'director': 'George Lucas',
      'producer': 'Gary Kurtz, Rick McCallum',
      'release_date': '1977-05-25',
    }
    const expected = { ...response }
    expected.resource = 'films'
    const mappedObj = await filmMapper(response)
    expect(mappedObj).to.deep.equal(expected)
  })

  it('planetMapper() - mapping correctly', async () => {
    const response = {
      'name': 'Alderaan',
      'rotation_period': '24',
      'orbital_period': '364',
      'diameter': '12500',
      'climate': 'temperate',
      'gravity': '1 standard',
      'terrain': 'grasslands, mountains',
      'surface_water': '40',
      'population': '2000000000',
      'residents': [
        'https://swapi.co/api/people/5/',
        'https://swapi.co/api/people/68/',
        'https://swapi.co/api/people/81/'
      ],
      'films': [
        'https://swapi.co/api/films/6/',
        'https://swapi.co/api/films/1/'
      ]
    }

    const searchResultStub = sinon.stub()
      .withArgs('homeworld-url').resolves({name: 'homeworld'})
    const doArrayApiCallStub = sinon.stub()
      .resolves([
        {name: 'name1', title: 'title1'},
        {name: 'name2', title: 'title2'},
        {name: 'name3', title: 'title3'}
      ])

    const expected = { ...response }
    expected.residents = ['name1', 'name2', 'name3']
    expected.films = ['title1', 'title2', 'title3']
    expected.resource = 'planets'

    const mappedObj = await planetMapper(
      response,
      {
        searchRequest: searchResultStub,
        doArrayApiCall: doArrayApiCallStub,
      }
    )
    expect(mappedObj).to.deep.equal(expected)
  })

  it('speciesMapper() - mapping correctly', async () => {
    const response = {
      'name': 'Hutt',
      'classification': 'gastropod',
      'designation': 'sentient',
      'average_height': '300',
      'skin_colors': 'green, brown, tan',
      'hair_colors': 'n/a',
      'eye_colors': 'yellow, red',
      'average_lifespan': '1000',
      'homeworld': 'https://swapi.co/api/planets/24/',
      'language': 'Huttese',
      'people': [
        'https://swapi.co/api/people/16/'
      ],
      'films': [
        'https://swapi.co/api/films/3/',
        'https://swapi.co/api/films/1/'
      ],
    }

    const searchResultStub = sinon.stub()
      .withArgs('homeworld-url').resolves({name: 'homeworld'})
    const doArrayApiCallStub = sinon.stub()
      .resolves([
        {name: 'name1', title: 'title1'},
        {name: 'name2', title: 'title2'},
        {name: 'name3', title: 'title3'}
      ])

    const expected = { ...response }
    expected.homeworld = 'homeworld'
    expected.people = ['name1', 'name2', 'name3']
    expected.films = ['title1', 'title2', 'title3']
    expected.resource = 'species'

    const mappedObj = await speciesMapper(
      response,
      {
        searchRequest: searchResultStub,
        doArrayApiCall: doArrayApiCallStub,
      }
    )
    expect(mappedObj).to.deep.equal(expected)
  })

  it('starshipMapper() - mapping correctly', async () => {
    const response = {
      'name': 'Millennium Falcon',
      'model': 'YT-1300 light freighter',
      'manufacturer': 'Corellian Engineering Corporation',
      'cost_in_credits': '100000',
      'length': '34.37',
      'max_atmosphering_speed': '1050',
      'crew': '4',
      'passengers': '6',
      'cargo_capacity': '100000',
      'consumables': '2 months',
      'hyperdrive_rating': '0.5',
      'MGLT': '75',
      'starship_class': 'Light freighter',
      'pilots': [
        'https://swapi.co/api/people/13/',
        'https://swapi.co/api/people/14/',
        'https://swapi.co/api/people/25/',
        'https://swapi.co/api/people/31/'
      ],
      'films': [
        'https://swapi.co/api/films/2/',
        'https://swapi.co/api/films/7/',
        'https://swapi.co/api/films/3/',
        'https://swapi.co/api/films/1/'
      ],
      'created': '2014-12-10T16:59:45.094000Z',
      'edited': '2014-12-22T17:35:44.464156Z',
      'url': 'https://swapi.co/api/starships/10/'
    }
    const doArrayApiCallStub = sinon.stub()
      .resolves([
        {name: 'name1', title: 'title1'},
        {name: 'name2', title: 'title2'},
        {name: 'name3', title: 'title3'}
      ])

    const expected = { ...response }
    expected.pilots = ['name1', 'name2', 'name3']
    expected.films = ['title1', 'title2', 'title3']
    expected.resource = 'starships'
    expected.crew_to_run_ship = '4'
    delete expected.crew
    delete expected.created
    delete expected.edited
    delete expected.url

    const mappedObj = await starshipMapper(
      response,
      {
        doArrayApiCall: doArrayApiCallStub,
      }
    )
    expect(mappedObj).to.deep.equal(expected)
  })

  it('vehiclesMapper() - mapping correctly', async () => {
    const response = {
      'name': 'Storm IV Twin-Pod cloud car',
      'model': 'Storm IV Twin-Pod',
      'manufacturer': 'Bespin Motors',
      'cost_in_credits': '75000',
      'length': '7',
      'max_atmosphering_speed': '1500',
      'crew': '2',
      'passengers': '0',
      'cargo_capacity': '10',
      'consumables': '1 day',
      'vehicle_class': 'repulsorcraft',
      'pilots': [],
      'films': [
        'https://swapi.co/api/films/2/'
      ],
      'created': '2014-12-15T12:58:50.530000Z',
      'edited': '2014-12-22T18:21:15.783232Z',
      'url': 'https://swapi.co/api/vehicles/20/'
    }

    const doArrayApiCallStub = sinon.stub()
      .resolves([
        {name: 'name1', title: 'title1'},
        {name: 'name2', title: 'title2'},
        {name: 'name3', title: 'title3'}
      ])

    const expected = { ...response }
    expected.pilots = ['name1', 'name2', 'name3']
    expected.films = ['title1', 'title2', 'title3']
    expected.resource = 'vehicles'
    expected.crew_to_run_ship = '2'
    delete expected.crew
    delete expected.created
    delete expected.edited
    delete expected.url

    const mappedObj = await vehicleMapper(
      response,
      {
        doArrayApiCall: doArrayApiCallStub,
      }
    )
    expect(mappedObj).to.deep.equal(expected)
  })
})
