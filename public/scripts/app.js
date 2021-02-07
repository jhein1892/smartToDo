$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});

const request = require('request')
const  booksUrl = "https://www.googleapis.com/books/v1/volumes?q=intitle:brave+new+world&amp;key=AIzaSyAdv_oMkP87wzdahZPNw2Gyph8Uk_ojdYs";

request(booksUrl, (res, req) => {
  //So we will need to take the input, and put it into the url. Will need to adjust the input though, and switch out all spaces with '+'.
  // Might even have to make seperate vars for each url that we are searching to.
  const myBody = JSON.parse(req.body)
  console.log(myBody.items)
})

//For Restaurants
const axios = require('axios')
let API_KEY = 'lWRisG_P5YE9lL_ObGpyMNJLhuj100IX_YwpMctg-B7kjGuxe0ONKN4uY7K1jgPSbhI63QnRrgPWrcuCjnvP2x9Uho2HdW3veyoMQE3DtPWa1DlWKxOy2Z6K0QIfYHYx'

let yelpREST = axios.create({
  baseURL: "https://api.yelp.com/v3/",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-type": "application/json",
  },
})

yelpREST('businesses/search', {
  params: {
    location: "Canada",
    term: "Starbucks",
    limit: 10
  },
}).then(({data}) => {
  let {businesses} = data
  businesses.forEach((b) => {
    console.log("Name: ", b)
  })
})

// MOVIES SEARCH
let url = "https://api.themoviedb.org/3/search/movie?api_key=ae721a1684f55599ab48cd0e1a2b32db&query=avengers";

request(url, (res, req) => {
  const body = JSON.parse(req.body)
  console.log(body)
})

// AMAZON PRODUCT SEARCH
const options = {
  method: 'GET',
  url: 'https://amazon-product-reviews-keywords.p.rapidapi.com/product/search',
  qs: {keyword: 'iphone', country: 'US', category: 'aps'},
  headers: {
    'x-rapidapi-key': 'fabbb13a2amsh1109ab44850de4cp1b226ejsnc0a65e8d2e8d',
    'x-rapidapi-host': 'amazon-product-reviews-keywords.p.rapidapi.com',
    useQueryString: true
  }
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);

	console.log(body);
});
