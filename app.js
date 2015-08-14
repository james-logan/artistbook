var express = require('express')
var app = express()
var bodyParser = require('body-parser')

var session = require('express-session')


//setting up the mongo database
require('./lib/mongodb')

//setting the templating engine you want to use
app.set('view engine', 'ejs')

//cookies
app.use(session(
//I have no idea what any of the stuff in this object does
  {
    secret: "expressbasicsisareallyawesomeapp",
    resave: false,
    saveUninitialized: true
}))


app.use(function (req, res, next) {
  req.session.count = 1;
  //regenerate creates a new session id every time. But we don't want to do that
  // req.session.regenerate(function () {

  // })
  console.log('SESSSSSSSIONN >>>>>>>>', req.session);
  next();

})

//makes the body available from post requests
app.use(bodyParser.urlencoded({extended: true}))

//sets up static files
app.use(express.static("www"))

app.use('/user', require('./routes/user.js'))

app.use(function requireAuth (req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/user/login')
  }
})
//sets up the modules middleware files for each route
app.use('/newartist', require('./routes/newartist.js'))
app.use('/artist', require('./routes/artist.js'))
// app.use('/album', require('./routes/album.js'))




var port = process.env.PORT || 3000;

app.listen(port)




