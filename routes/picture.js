var express = require('express')
var router = express.Router()

var bingUtil = require('../utlis/bingUtil')
var dbUtil = require('../utlis/dbUtil')

router.get('/bing/:idx', function(req, res, next) {
  var opts = {}
  bingUtil.fetchDailyPic(opts, function (data) {
    dbUtil.insert('picture', data, function(err){
      res.json({d: err})
    })
  })
})

module.exports = router
