var express = require('express')
var app = express()
var bodyParser = require('body-parser')


//setting up the mongo database
require('./lib/mongodb')

//setting the templating engine you want to use
app.set('view engine', 'ejs')

//makes the body available from post requests
app.use(bodyParser.urlencoded({extended: true}))

//sets up the modules middleware files for each route
app.use('/newartist', require('./routes/newartist.js'))
app.use('/artist', require('./routes/artist.js'))
// app.use('/album', require('./routes/album.js'))

//sets up static files
app.use(express.static("www"))


var port = process.env.PORT || 3000;

app.listen(port)




