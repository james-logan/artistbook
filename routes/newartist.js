var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.render('templates/newartist.ejs')
})

router.post('/', function (req, res) {
  db.collection('artists').insert(req.body);
  res.send({})
})

module.exports = router
