var express = require('express');
var router = express.Router();

var dbUtil = require('../utlis/dbUtil')

router.get('/photo/:id', function(req, res, next) {
  var id = req.params.id
  var sql = `select * from picture where id = ${id}`
  dbUtil.sqlQuery(sql, function(rows) {
    if(rows.length === 1){
      res.render('photo', {Data: rows[0]})
    }else{
      res.redirect('/')
    }
  })
})

module.exports = router;
