const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmV3YmVycnljIiwiYSI6ImNrYWxrczNzNTBibXQyc3BpaHZscmp1dGIifQ.jiloe3KsH0bzb95sw6foJg&limit=1'
    
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback( {
                message: 'Unable to connect to geolocation service',
                error
            })
        } else if (body.features.length === 0) {
            callback({
                message: 'Unable to find geolocation'
            })
        } else {
            const { place_name: location, center } = body.features[0]
            callback( undefined, {
                message: 'Success',
                location,
                latitude: center[1],
                longitude: center[0]
            })
        }
    })
}

module.exports = geocode

// Mapbox
// newberryc
// MBdevNode
// chuck.newbs@gmail.com
// pk.eyJ1IjoibmV3YmVycnljIiwiYSI6ImNrYWxrczNzNTBibXQyc3BpaHZscmp1dGIifQ.jiloe3KsH0bzb95sw6foJg

// https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibmV3YmVycnljIiwiYSI6ImNrYWxrczNzNTBibXQyc3BpaHZscmp1dGIifQ.jiloe3KsH0bzb95sw6foJg
