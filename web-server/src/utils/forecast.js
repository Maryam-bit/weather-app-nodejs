const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=05a695312f2b68a694c3fce46bb9b0ec&query=${latitude},${longitude}&units=f`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("unable to connect to weather service", undefined);
        } else if (body.error) {
            callback("unable to find location", undefined);
        } else {
            const tempInCelsius = fToC(body.current.temperature)
            const feelsLikeTempInCelsius = fToC(body.current.feelslike)
            callback(undefined, `${body.current.weather_descriptions[0]}.It is current ${tempInCelsius.toFixed(1)} degree.But it feels like ${feelsLikeTempInCelsius.toFixed(1)} degree. The humidity is ${body.current.humidity}%.`)
        }
    })
}

function fToC(fahrenheit) 
{
  var fTemp = fahrenheit;
  var fToCel = (fTemp - 32) * 5 / 9;
    return fToCel
} 

module.exports = forecast;