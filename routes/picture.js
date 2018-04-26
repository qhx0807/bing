var express = require('express')
var router = express.Router()

var bingUtil = require('../utlis/bingUtil')
var dbUtil = require('../utlis/dbUtil')

router.get('/bing/:idx', function (req, res, next) {
  var opts = {}
  bingUtil.fetchDailyPic(opts, function (data) {
    dbUtil.insert('picture', data, function(result){
      if (result.insertId){
        res.json({OK: 'ok'})
      }else{
        res.json({error: 'error'})
      }

    })
  })
})

router.get('/pic', function(req, res, next) {
  var opts = {
    query: '',
    page: {page: 1, num: 10}
  }
  dbUtil.getCount('picture', {}, function (sum) {
    dbUtil.get('picture', opts, function (data) {
      res.json({
        OK: 'ok',
        Num: sum[0].sum,
        Data: data
      })
    })
  })

})

module.exports = router
