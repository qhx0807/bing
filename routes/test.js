var express = require('express')
var router = express.Router()

router.get('/test', function (req, res, next) {
  res.json({a: '1'})
})

module.exports = router
