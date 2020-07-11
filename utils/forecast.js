
const request = require('request');
//forecast gets longitude and latitude and a callback funciton which has error and the weather info as two args
const forecast = (latitude,longitude,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=4f6d726760bc3e6e55091220e0b0d9a8&query=${latitude},${longitude}`;

    request({url:url,json:true},(error,{body}) =>{ //{body} is destructuring 
        if(error){
            callback('Unable to connect to the API :(',undefined);
        } else if (body.error){
            callback(`Location is not traceable`,undefined);
        } else{
            callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. There is ${(body.current.precip)===0?`a ${body.current.precip}`:`${body.current.precip}`}% chance of rain`);

        }
    });


}


module.exports = forecast;