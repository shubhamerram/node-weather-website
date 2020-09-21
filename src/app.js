const path = require('path')
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.PORT || 3000;
// Config list
const viewDir = path.join(__dirname, '../templates/views'); 
const publicDir = path.join(__dirname,'../public');
const partialDir = path.join(__dirname,'../templates/partial/');
app.set('view engine','hbs');
app.set('views', viewDir);
app.use(express.static(publicDir));
hbs.registerPartials(partialDir);

// routes

app.get('', (req, res) => {
    let data = {
        title: "Weather",
        name: "Shubham erram"
    }
    res.render('index', data)
})


app.get('/weather', (req, res) => {
    console.log(req.query.address);
    if(!req.query.address) {
       return res.send({
           error: "Address not provided"
       })
    }

    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        forecast(lat, long, (error, {forecast, icon}) => {
            if(error) {
                return res.send({
                    error
                });
            }
            res.send({
                forecast,
                location,
                icon,
                address: req.query.address
            }) 
        })

    })

    
})

app.get('/about', (req, res) => {
    let data = {
        title: "About",
        name: "Shubham erram"
    }
    res.render('about', data)
})

app.get('/help', (req, res) => {
    let data = {
        title: "Help",
        name: "Shubham erram"
    }
    res.render('help', data);
})

app.get('/help/*', (req, res) => {
    let data = {
        message :"Help not found"
    }
    res.render('not-found', data)
})

app.get('*', (req, res) => {
    let data = { 
        message: "404 Page not found"
    }
    res.render('not-found', data)
})


app.listen(port, function() {
    console.log('server is running on port '+port)
})
