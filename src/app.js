const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const app = express();
// for heroku the environment variable to be used else 3000
const port = process.env.PORT || 3000

const forecast = require('../utils/forecast');
console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname,'../public'));
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

hbs.registerPartials(partialPath);


//Set up the views location and the view engine as hbs for express
app.set('views',viewPath);
app.set('view engine','hbs');

// Setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')));


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Yashvardhan Verma'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Yashvardhan Verma'
    });

});
app.get('/help',(req,res) =>{
    res.render('help',{
        title:'Help',
        helpText:'Important Text Please Read',
        name:'Yashvardhan Verma'
    })

});

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'Error! An adddress is required to get the weather information'
        });
    }

    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({
                error
            });
        }

        else{
            forecast(data.latitude,data.longitude,(error,forecastData)=>{
                if(error){
                    return res.send({
                        error
                    });
                }
                else{
                    return res.send({

                        location:data.location,
                        weather:forecastData,
                        address:req.query.address

                    });
                }
            })
        }

        
    })
    

});

app.get('/help/*',(req,res)=>{

    res.render('helpError',{
        text:'The help article you are looking for is not present, please look for antother page',
        title:'Help article not found'

    });

});

app.get('*',(req,res)=>{

    res.render('error404',{
        text:'Page not found. The page you are looking for is not hosted by this domain. Please try another page',
        title:'Page not found'

    });

});
app.listen(port,()=>{

    console.log('Server is up!'+'on '+port);

});