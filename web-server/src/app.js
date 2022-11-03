const path = require('path')
const express = require("express");
const hbs = require('hbs')

const app = express();
const port = process.env.PORT || 3000

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast")

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Maryam Noor"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Maryam Noor"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        helpText: "This is some helpful text",
        name: "Maryam Noor"
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    })
})

app.get("/products", (req, res) =>{
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: "404 Page",
        errorMessage: "help article not found",
        name: "Maryam Noor"
    })
})

app.get('*', (req, res) => {
    res.render('notFound', {
        title: "404 Page",
        errorMessage: "Page not found",
        name: "Maryam Noor"
    })
})
// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})