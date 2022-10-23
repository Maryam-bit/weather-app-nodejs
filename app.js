const request = require("request")
 const url = "http://api.weatherstack.com/current?access_key=05a695312f2b68a694c3fce46bb9b0ec&query=37.8267,-122.4233"

 request({ url: url }, (error, response) => {
    const data = JSON.parse(response.body);
    console.log(data.current);
 })