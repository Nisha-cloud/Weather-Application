const request = require('request')

// console.log('sccnfd')
const geocode = (address, callback) => {

const geocodeurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoibmlzaGExOSIsImEiOiJjbDJtNTU3dG4wZDhzM2x0NXkyMWs5dTdxIn0.nXOzswdYp7AT0LrCdPZmuQ'

request({url: geocodeurl, json: true}, (error, response) => {
    if(error)
    {
        callback('Unable to connect to internet', undefined)
    }
    else if(response.body.features.length === 0){
        callback('Unable to find location', undefined)

    }
    else{
    callback(undefined,{
        latitude: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1]





    } )
    // callback(undefined, response.body.features[0].center[1])
    }
}
)
}

module.exports = geocode