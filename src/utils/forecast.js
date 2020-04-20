const request  = require('request')

// const forecast = (latitude,longitude,callback) => {
//     const forecastUrl = 'https://api.darksky.net/forecast/0e3ece08d22a267e351be30ef9e0eb0d/' +latitude+','+longitude+'?units=si'
//     request({url: forecastUrl,json: true},(error,response) => {
//         if(error)
//         {
//             callback('Unable to connect to Weather app',undefined)
//         }
//         else if(response.body.error)
//         {
//             callback('Unable to find the location in Weather app',undefined)
//         }
//         else
//         {
//             callback(undefined,{
//                 summary:response.body.daily.data[0].summary,
//                 temp:response.body.currently.temperature,
//                 precipProbability: response.body.currently.precipProbability,
//                 location:response.body.timezone
//             })
//         }
//     })
// }


const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/0e3ece08d22a267e351be30ef9e0eb0d/' +latitude+','+longitude+'?units=si'
    request({url,json: true},(error,{body}={}) => {
        if(error)
        {
            callback('Unable to connect to Weather app',undefined)
        }
        else if(body.error)
        {
            callback('Unable to find the location in Weather app',undefined)
        }
        else
        {
            callback(undefined,{
                summary:body.daily.data[0].summary,
                temp:body.currently.temperature,
                precipProbability:body.currently.precipProbability,
                location:body.timezone
            })
        }
    })
}


module.exports = forecast