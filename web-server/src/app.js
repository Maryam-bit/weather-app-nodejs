const path = require('path')
const express = require("express");
const hbs = require('hbs')
const app = express();

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
    res.send({
        forecast: 'It is snowing',
        location: 'Pakistan'
    });
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

app.listen(3000, () => {
    console.log("Server is up on port 3000")
})