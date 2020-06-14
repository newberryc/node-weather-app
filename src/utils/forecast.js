const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ee8d4dfcc6f27cd4cb0d17b32952f01e&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback({
                error: {
                    message: 'Unable to connect to the weather service!',
                    error
                }
            })
        } else if (body.error) {
            callback({
                error: {
                    message: 'Unable to find location',
                    error: body.error
                }
            })
        } else {
            const { temperature, feelslike, weather_descriptions: descriptions, uv_index } = body.current
            callback(undefined, {
                message: 'Success',
                forecastDescription: 'It is currently ' + descriptions[0] + ' and ' + temperature + ' degrees out.  It feels like ' + feelslike + ' degrees out.  The UV index is ' + uv_index + '.'
            })
        }
    })
}

module.exports = forecast

// WeatherStack
// chuck.newbs@gmail.com
// WSdevNode
// ee8d4dfcc6f27cd4cb0d17b32952f01e
// http://api.weatherstack.com/
// http://api.weatherstack.com/current?access_key=ee8d4dfcc6f27cd4cb0d17b32952f01e&query=32.8767,-122.4233
