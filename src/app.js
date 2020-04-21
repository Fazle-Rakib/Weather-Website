const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')

const port = process.env.PORT || 3000

//Define path for express config
const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')    //Renaming views -> templates & working on it
const partialPath = path.join(__dirname,'../templates/partials')

//Set handelbars engine and views location 
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//Setup static directory serve
app.use(express.static(publicDirPath))
//app.set('view engine','hbs')  //Only works when views folder have all the view

app.get('',(req,res) =>{
    res.render('index',{
        title: 'Weather App',
        name: 'Fazle Rakib'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        name: 'Rakib',
        title: 'ABout'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title: 'Help Page',
        msg: 'This page will help you to navigate throughout the weather app.',
        name:'Fazle Rakib'
    })
})


// app.get('/weather',(req,res) =>{
//     //res.send('Weather app developing with express.js')
//     res.send({
//         forecast : 'Now there is x degree temperature',
//         location:'Philadelphia'           
//     })
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'There is no address given!'
            
        })
    }
    geocode(req.query.address,(error,{longitude,latitude,location:dataLocation}={})=>{
        if(error)
        {
            return res.send({
                Error: error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({
                    Error: error
                })
            }
            res.send({
                forecast:forecastData,
                dataLocation,
                address: req.query.address
            })
        })
    })

})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:'You have to serach something'
        })
    }
   
    res.send({
        product:[]
    })

})

app.get('/weather/*',(req,res)=>{
    res.render('error',{
        title:'404 Error',
        msg:'Weather blog not found',
        name:'Fazle Rakib'
    })
})

app.get('/about/*',(req,res)=>{
    res.render('error',{
        title:'404 Error',
        msg:'About blog not found',
        name:'Fazle Rakib'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404 Error',
        msg:'Help blog not found',
        name:'Fazle Rakib'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404 Error',
        msg:'The Page you are searching not found.',
        name:'Fazle Rakib'
    })
})

// app.get('/help/*',(req,res)=>{
//     res.send('Help Subitem not found!')
// })

// //404 error handler
// app.get('*', (req,res)=>{
//     res.send('My 404 page')
// })

app.listen(port,() =>{
    console.log('Server is running on port '+ port)
})


// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname,'../public'))


// app.get('',(req,res) => {
//     res.send('<h1>Weather</h1>Hello Express!')
// }) 

// app.get('/help',(req,res) => {
//     res.send([{
//         name: 'Fazle Rabbi Rakib',
//         age:21
//     },{
//         name:'Andrew',
//         age:27
//     }])
// })

// app.get('/about',(req,res) => {
//     res.send('This is about page. Working on a weather app')
// })