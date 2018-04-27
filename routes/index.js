var express = require('express');
var router = express.Router();

var dbUtil = require('../utlis/dbUtil')

/* GET home page. */
router.get('/', function(req, res, next) {
  var p = !!req.query.p && Number(req.query.p) > 0 ? Number(req.query.p) : 1
  var opts = {
    query: '',
    page: {page: p, num: 10}
  }
  var next, prev, total;
  dbUtil.getCount('picture', {}, function (sum) {
    total = Math.ceil(sum[0].sum/10)
    next = p+1 > total ? p : p+1
    prev = p-1 > 0 ? p-1 : 1

    dbUtil.get('picture', opts, function (data) {
      var a = {
        CurrPage: p,
        Total: total,
        Next: next,
        Prev: prev,
        Num: sum[0].sum,
        Data: data
      }
      if (data.length > 0) {
        res.render('index', a)
      } else {
        res.redirect('/')
      }
    })
  })
});

module.exports = router;
