var express = require('express')
var router = express.Router()

var bingUtil = require('../utlis/bingUtil')

router.get('/bing', function(req, res, next) {
  var arr = []
  bingUtil.fetchDailyPic(function (data) {
    arr.push(data)
    console.log(1)
  })
})

module.exports = router;
