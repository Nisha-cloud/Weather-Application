const request = require("request");
// const abc = require('./utils/geocode')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&APPID=422afefbebd4f36a8304168a08d51184&units=metric'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to internet', undefined)
        }
        else if (response.body.length === 0) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, 'The minimum temperature for today is  ' + response.body.list[0].main.temp_min + '  and max temp is  '  + response.body.list[0].main.temp_max  + '   and weather is  '  + response.body.list[0].weather[0].main
                // latitude: response.body.features[0].center[0],
                // longitude: response.body.features[0].center[1],
                // weather: response.body.list[0].weather
                // weather: response.body.list[0].weather
            

            
            )
        }
    }

    )
}
 module.exports = forecast 