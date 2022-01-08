const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const map = 'http://api.weatherstack.com/current?access_key=7e387aea3160c796d10290d9f34170aa&query=' + latitude + ' , ' + longitude + '&units=m'

    request({url:map, json:true}, (error, {body})=>{
        if (error) {
            callback('Cannot reach web service',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,{
                Temperature: body.current.temperature,
                Precipitation: body.current.precip
            })
        }
    })
}

module.exports = forecast