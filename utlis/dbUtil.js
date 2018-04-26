var mysql = require('mysql');
var dbConfig = require('../config/db')
var objectAssign = require('object-assign')

var pool = mysql.createPool(dbConfig.bing)

module.exports = {
  /**
   * 执行sql语句
   *
   * @param {string} sql
   * @param {fun} callback
   */
  sqlQuery: function (sql, callback) {
    try {
      pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, rows) {
          connection.release()
          if (!err) {
            callback && callback(rows)
          } else {
            console.log(err)
          }
        })
      })
    } catch (error) {
      console.log(error)
      console.log(sql)
      callback && callback([])
    }
  },

  /**
   * 查询
   *
   * @param {string} table
   * @param {any} params {page:0, num: 1}
   * @param {func} callback
   */
  get: function (table, params, callback) {
    var defaultPage = {
      page: 1,
      num: 10
    }
    var condition = []
    var query = params.query || {}
    var page = params.page || {}
    defaultPage = objectAssign(defaultPage, page)
    var sql = 'select * from ' + table
    if (Object.prototype.toString.call(query) === '[object Object]') {
      for (var i in query) {
        condition.push(i + '="' + query[i] + '"')
      }
      if (condition.length > 0) {
        sql += ' where ' + condition.join(' and ')
      }
    } else if (Object.prototype.toString.call(query) === '[object String]') {
        sql += ' where ' + query;
    }
    sql += ' order by id desc limit ' + (defaultPage.page - 1) * defaultPage.num + ',' + defaultPage.num
    module.exports.sqlQuery(sql, callback)
  },

  /**
   * 获得总条数
   * @table   表名
   * @params  参数{k:v}
   * @callback
   */
  getCount: function(table, params, callback) {
    var sql = 'select count(id) as sum from ' + table
    var _condition = [];
    if (Object.prototype.toString.call(params) === '[object Object]') {
        for (var i in params) {
            _condition.push(i + '="' + params[i] + '"')
        }
        if (_condition.length > 0) {
            sql += ' where ' + _condition.join(' and ')
        }
    } else if (Object.prototype.toString.call(params) === '[objcet String]') {
        sql += ' where ' + params
    }
    module.exports.sqlQuery(sql, callback)
  },

  /**
   * 插入数据
   *
   * @param {string} table
   * @param {object} params
   * @param {func} callback
   */
  insert: function (table, params, callback) {
    var keys = []
    var vals = []
    for (k in params) {
      keys.push(k)
      vals.push(params[k])
    }
    var sql = 'insert into ' + table + '(' + keys.join(',') + ') values("' + vals.join('","') + '")'
    module.exports.sqlQuery(sql, callback)
  },

  /**
   *
   *
   * @param {String} table
   * @param {any} params
   * @param {func} callback
   */
  update: function(table, params, callback) {
    var body = params.body
    var condition = params.condition
    var body_temp = []
    var condition_temp = []
    for (var i in body) {
        body_temp.push(i + '="' + body[i] + '"')
    }
    for (var j in condition) {
        condition_temp.push(j + '="' + condition[j] + '"')
    }
    if (body_temp.length > 0 && condition_temp.length > 0) {
        var sql = 'update ' + table + ' set ' + body_temp.join(',') + ' where ' + condition_temp.join(' and ')
        module.exports.sqlQuery(sql, callback)
    }
  }


}
