const request = require("request")
const url = "http://api.weatherstack.com/current?access_key=05a695312f2b68a694c3fce46bb9b0ec&query=37.8267,-122.4233&units=f"

request({ url: url, json: true }, (error, response) => {
    console.log(response.body.current);
    console.log(`${response.body.current.weather_descriptions[0]}. It is current ${response.body.current.temperature} degrees. But it feels  like ${response.body.current.feelslike} degrees`)
})

//position stack
// address -> lat/long -> weather

const positionstackURL = "http://api.positionstack.com/v1/forward?access_key=d1736f065c7531db59f6ab856889f07e&query=Los Angeles";

request({ url: positionstackURL, json: true }, (error, response) => {
    console.log(response.body)
    const longitude = response.body.data[0].longitude
    const latitude = response.body.data[0].latitude
    console.log(longitude, latitude, "longitude latitude")
})