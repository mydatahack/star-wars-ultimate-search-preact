'use strct';

const fs = require('fs');
const request = require('request-promise');
const BASE_URL = 'https://swapi.co/api';

const getData = (resourceName, pageIndex) => {
  const url = `${BASE_URL}/${resourceName}/?page=${pageIndex}`;
  return request(url)
    .then((response) => {
      return response;
    })
    .catch((err) =>  console.log(`API Error: ${err}`));
};

const createJson = async (resourceName) => {
  let looping = true;
  let pageIndex = 1;
  let data = [];

  while(looping) {
    let response;
    let next;
    try {
      response = await getData(resourceName, pageIndex);
      response = JSON.parse(response);
      next = response.next;
      console.log('next url: ', next);
      console.log('count ', response.count);
      if (!response.next) {
        looping = false;
      }
      data = [ ...data, response.results ];
      pageIndex +=1;
      console.log('page index: ', pageIndex);
    } catch (e) {
      console.log('getData promise error: ', e);
    }
  }
  // file path relative to root ast it is called from package.json script
  fs.writeFileSync(`./reference/data/${resourceName}.json`, JSON.stringify(data, null, 2));
  console.log(`File created for ${resourceName}`);

};

const array = ['films', 'people', 'planets', 'species', 'starships', 'vehicles'];

array.forEach((value, index) => {
  console.log(`Data ingestion starting for ${value}`);
  createJson(value);
});



