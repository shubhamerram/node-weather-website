const request = require('request');

function forecast(lat, long, callback) {
    // request the server 
    // check the network error 
    // check the reponse error
    // return forecast
    let weatherUrl = "http://api.weatherstack.com/current?access_key=6f71d9cb628de022db4739ffb193a49f&query="+lat+","+long+"&units=f";
        request(weatherUrl, {json:true},(error, {body}) => {
            console.log(body)
            if(error) {
                callback('network error', undefined)
            } else if(body.error) {
                callback('lat long error', undefined)
            } else {
                let current = body.current.temperature;
                let apparent = body.current.feelslike;
                let data = {
                    forecast: 'Its is currently '+current+' degrees out. it feels like '+apparent+' degrees out',
                    icon: body.current.weather_icons[0]
                }
                callback(undefined, data);
            }
        })
}

module.exports = forecast;