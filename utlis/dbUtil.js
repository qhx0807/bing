var mysql = require('mysql');
var dbConfig = require('../config/db')

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
   * @param {any} params
   * @param {func} callback
   */
  get: function (table, params, callback) {
    var defaultPage = {
      page: 1,
      num: 10
    }

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
  }


}
