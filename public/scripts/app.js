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


// MOVIES SEARCH
const request = require ('request');
let url = "https://api.themoviedb.org/3/search/movie?api_key=ae721a1684f55599ab48cd0e1a2b32db&query=avengers";

request(url, (res, req) => {
  const body = JSON.parse(req.body)
  console.log(body)
})

// AMAZON PRODUCT SEARCH
var unirest = require("unirest");
var req = unirest("GET", "https://amazon-product-reviews-keywords.p.rapidapi.com/product/search");

req.query({
	"keyword": "iphone",
	"country": "US",
	"category": "aps"
});

req.headers({
	"x-rapidapi-key": "fabbb13a2amsh1109ab44850de4cp1b226ejsnc0a65e8d2e8d",
	"x-rapidapi-host": "amazon-product-reviews-keywords.p.rapidapi.com",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body.products);
});
