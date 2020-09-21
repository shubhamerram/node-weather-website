const request = require('request')

function get(address, callback) {
    let locationUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoic2h1YmhhbWVycmFtIiwiYSI6ImNrZjk3bnNwaDBqanYyc3JxYTBodGZyZGEifQ.pnR6BQf3pwiL22hDvBRrYQ";
    request(locationUrl,{json:true},(error, {body}) => {
        if(error) {
            callback('network error', undefined)
        } else if(body.features.length == 0) {
            callback('Location error', undefined)
        } else {
            let data = {
                lat:  body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name,                
            }
            callback(undefined, data);
        }
      
        
    })
}

module.exports = get;