// const request = require('request')
const axios = require('axios')
const request = require('request')

// // For books
//Works as expected.

function findBooks(input) {
  let myBook = input.replace(' ', '+')
return axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle::"${myBook}"lccn+&amp;key=AIzaSyAdv_oMkP87wzdahZPNw2Gyph8Uk_ojdYs`)
  .then((response) => {

    console.log(response.data.items[0])
  })
  .catch((error) => {
    console.log(error)
  })
}
// findBooks('McDonalds')

// For Restaurants
// Working as expected
function findFood(input) {
  let API_KEY = 'lWRisG_P5YE9lL_ObGpyMNJLhuj100IX_YwpMctg-B7kjGuxe0ONKN4uY7K1jgPSbhI63QnRrgPWrcuCjnvP2x9Uho2HdW3veyoMQE3DtPWa1DlWKxOy2Z6K0QIfYHYx'

  let yelpREST = axios.create({
  baseURL: "https://api.yelp.com/v3/",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-type": "application/json",
  },
})
// see if i can switch this to just restuarants
  return yelpREST('businesses/search', {
  params: {
    location: "Canada",
    term: input,
    limit: 1
  },
}).then(({data}) => {
  let {businesses} = data
  businesses.forEach((b) => {
    console.log(b)
  })
}).catch(err => console.log(err))

}

// findFood('McDonalds')

// MOVIES SEARCH
// Working as Expected
const findMovie = function(input) {
let myMovie = input.replace(' ', '+')
return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=ae721a1684f55599ab48cd0e1a2b32db&query=${myMovie}`)
  .then((response) => {

  })
  .catch((error) => {
    console.log(error)
  })
}

// findMovie('McDonalds')

// // AMAZON PRODUCT SEARCH
// might need to find alternative.
// const findItem = function(input) {

// const options = {
//   method: 'GET',
//   url: 'https://amazon-product-reviews-keywords.p.rapidapi.com/product/search',
//   qs: {keyword: '', country: 'US', category: 'aps'},
//   headers: {
//     'x-rapidapi-key': 'fabbb13a2amsh1109ab44850de4cp1b226ejsnc0a65e8d2e8d',
//     'x-rapidapi-host': 'amazon-product-reviews-keywords.p.rapidapi.com',
//     useQueryString: true
//   }
// };
// // console.log(options.qs.keyword)
// options.qs.keyword = input
// // there might be a time limit on this one. Sometimes it will work, others it wont.
// request(options, function (error, response, body) {
//   if (error) throw new Error(error);
//   let input = JSON.parse(body)
//   return true
// });
// }

// findItem('Mcdonalds')

module.exports = {
  findFood,
  findBooks,
  findMovie,
  // findItem
}

// const findBooks = function(input) {
//   let myBook = input.replace(' ', '+')
//   console.log(myBook)
//   let appid = 'P4ULKG-LLRG3V6HT5'
//   const  booksUrl = `http://api.wolframalpha.com/v2/query?input=${input}&appid=${appid}`;

//   request(booksUrl, (res, req) => {
//     console.log('req', req.body)
//   })
// }

// findBooks('harry potter')


