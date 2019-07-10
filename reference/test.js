const data = {
  'name': 'Anakin Skywalker',
  'height': '188',
  'mass': '84',
  'hair_color': 'blond',
  'skin_color': 'fair',
  'eye_color': 'blue',
  'birth_year': '41.9BBY',
  'gender': 'male',
  'homeworld': 'https://swapi.co/api/planets/1/',
  'films': [
    'https://swapi.co/api/films/5/',
    'https://swapi.co/api/films/4/',
    'https://swapi.co/api/films/6/'
  ]
}

const interateJson = (data) => {
  for (key in data) {
    console.log(key)
    console.log(data[key])
    if(Array.isArray(data[key])) {
      console.log(`${data[key]} is an array`)
    }
  }
}

interateJson(data)

const interateApiCall = (data) => {
  for (key in data) {
    console.log(key)
    console.log(data[key])
    if(Array.isArray(data[key])) {
      console.log(`${data[key]} is an array`)
    }
  }
}
