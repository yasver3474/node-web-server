const request = require('request');


// calback takes two arguments one is error if not then undefined and the second is an object containing lat long and loc
const geocode = (address,callback) =>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoieWFzdmVyMzQ3NCIsImEiOiJja2MyYTdiNWUxdXo3MnpuYTFnNnVmYXNiIn0.BMdXeFE3BTZEifENO5ORCQ&limit=1`;

    request({url:url,json:true},(error,{body}) => {

        if(error){
            callback('Unable to connect to the location Services',undefined);
        } else if(body.features.length === 0){
            callback('Unable to find location. Try another search',undefined);
        } else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
            });
        }

    });

};


module.exports=
    geocode;
