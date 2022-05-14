const request = require('request')
const geocode = require('./utils/geocode' )
const forecast = require('./utils/forecast' )
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const port = process.env.PORT || 3000
// const { abort } = require('process')
console.log(__dirname)
const app = express()

//Define paths for Express confi
const publicPathDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views' )
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and viewslocation
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



//Set up static dictionary to serve
app.use(express.static(publicPathDirectory))

app.get('/',(req,res) => {
    res.render('index' , {
        title: 'Weather Report',
        name: 'Nisha Raitani'
    })
})
app.get('/about', (req,res) => {
    res.render('about' , {
        title: 'About Me',
        name: 'Nisha Raitani'

    })
})
app.get('/help' , (req,res) => {
    res.render('help', {
        title: 'Contact Us',
        description: 'We are here to help you with your queries related to Node js development course ',
        name : 'Nisha Raitani'

    })
    
})

app.get('/products', (req,res) => {
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search term'
        })

    }
    console.log(req.query.search)
    res.send ({
        products: []
    }

    )
})
// app.get('', (req, res) => {
//     res.send('Hello Express!')
// })
// app.get('/help' , (req,res) => {
// res.send('Help page')
// })
// app.get('/about' , (req,res) => {
//     res.send('<h1>Nisha Raitani</h1>')
// })
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide us with correct address'
        })
    }  



    geocode(req.query.address, (error, {latitude, longitude} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, weather) => {
            if(error){
                return res.send({error})
            }
            res.send({
                weather: weather,
                address:  req.query.address
            })
        })
    }

   
    // res.send({
        
    //     location: 'Noida',
    //     Weather: '45 degrees',
    //     address: req.query.address
         
        
    // })

)
}
)

app.get('/help/*' , (req,res) => {
    res.render('404', {
        title: 404,
        name: 'Nisha Raitani',
        errormessage: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 404,
        name: 'Nisha Raitani',
        errormessage: 'Page not found'

    }
    )
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})



