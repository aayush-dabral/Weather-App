const path = require('path')

//adding express and handlebars modules
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000  //setting the port up fro what will be provided by heroku

const request = require('request')

//importing geocode and forecast files
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { response } = require('express')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

//Define paths for express config
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Set up hendlebar engine and views library
app.set('view engine','hbs')
app.use(express.static(publicPath))
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.set('views', viewsPath) //This is an addition which is not explained yet....

app.get('', (req,res)=>{
    res.render('index.hbs',{
        Title: 'Weather App',
        Name: 'Aayush Dabral'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        Title: 'Help Page',
        Message: 'This is the help message',
        Name: 'Aayush Dabral'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        Title: 'About Me',
        Name: 'Aayush Dabral'
    })
})

app.get('/weather', (req,res)=>{
    
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error, {longitude,latitude,placename} = {})=> {
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error,{Temperature,Precipitation}) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                placename: placename,
                Temperature: Temperature,
                Precipitation: Precipitation
            })
        })
    })
})

app.get('/products', (req,res)=>{
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('error',{
        Title: '404 error',
        Msg: 'Help directory not found',
        
    })
})

app.get('*', (req,res)=>{
    res.render('error',{
        Title: '404 error',
        Msg:'My 404 page'
    })
})

app.listen(port, ()=>{
    console.log('The server is up and running on' + port)
})