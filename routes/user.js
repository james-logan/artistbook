var express = require('express')
var router = express.Router()

var User = require('../lib/models/User');

router.get('/login', function (req, res) {
  res.render('user/login');
})

router.post('/login', function (req, res) {
  User.login(req.body, function (err, user) {
    req.session.regenerate(function () {
      req.session.userId = user._id;
      res.redirect('/newartist');
    })
  })
})

router.get('/new', function newUser (req, res) {
  //registration page
  res.render('templates/newuser', {})
})

router.post('/', function createUser (req, res) {
  //perform the registration
  console.log(req.body)
  User.create(req.body, function (err) {
    if (err) {
      //redirects are based on the root of the app
      res.render('user/new', {err: err})
    } else {
      res.redirect('/')
    }
  })


})
module.exports = router;
