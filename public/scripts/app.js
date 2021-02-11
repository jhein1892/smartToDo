const axios = require('axios');


// API For books
function findBooks(input) {
  let myBook = input.replace(' ', '+');
  return axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle::"${myBook}"+&amp;key=AIzaSyAdv_oMkP87wzdahZPNw2Gyph8Uk_ojdYs`)
    .then((response) => {
      let body = response.data.items;
      for (let i = 0; i < 10; i++) {
        if (body[i].volumeInfo.title === input) {
          return body[i].volumeInfo.title;
        }
      }
    })
    .catch(err => err.statusCode);
}

// API For Restaurants
function findFood(input) {
  let API_KEY = 'lWRisG_P5YE9lL_ObGpyMNJLhuj100IX_YwpMctg-B7kjGuxe0ONKN4uY7K1jgPSbhI63QnRrgPWrcuCjnvP2x9Uho2HdW3veyoMQE3DtPWa1DlWKxOy2Z6K0QIfYHYx';

  let yelpREST = axios.create({
    baseURL: "https://api.yelp.com/v3/",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-type": "application/json",
    },
  });

  return yelpREST('businesses/search', {
    params: {
      location: "Canada",
      term: input,
      limit: 1,
      categories: 'restaurants, All'
    },
  }).then(({data}) => {
    let name = data.businesses[0].name;
    if (name === input) {
      return name;
    }
  }).catch(err => err.statusCode);
}

// API MOVIES SEARCH
const findMovie = function(input) {
  let myMovie = input.replace(' ', '+');
  return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=ae721a1684f55599ab48cd0e1a2b32db&query=${myMovie}`)
    .then((response) => {
      let movie = response.data.results;
      for (let i = 0; i < 10; i++) {
        if (movie[i].title === input) {
          return movie[i].title;
        }
      }
    })
    .catch(err => err.statusCode);
};

module.exports = {
  findFood,
  findBooks,
  findMovie,
};

