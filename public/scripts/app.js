// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

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

