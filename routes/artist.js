var express = require('express')
var router = express.Router()

router.get('/:name', function (req, res) {
  var templateObj = {};
  db.collection('artists').find({ 'name' : req.params.name }, {'_id':0}).toArray(function (err, docs) {
    if (err) {
      console.log(err)
    }
    console.log(docs[0])
    templateObj = docs[0]
    db.close()
    res.render('templates/artist.ejs', templateObj)
  })


})

router.post('/', function (req, res) {
  db.collection('albums').insert(req.body);
  res.send({})
})

module.exports = router
