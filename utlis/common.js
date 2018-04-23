module.exports = {
  /**
   * 请求错误处理函数
   *
   * @param {any} err
   * @param {any} res
   * @param {func} callback
   */
  errProcess: function (err, res, callback) {
    try {
      if (!err && res.status === 200) {
        var body = null
        if (res && res.text) {
          body = res.text
        }
        if (typeof body === 'string') {
          try {
            body = JSON.parse(body)
          } catch (error) {
            throw new Error(error)
          }
        }
        if (body.error_code || body.error) {
          throw new Error(res)
        } else {
          callback && callback(body)
        }
      } else {
        throw new Error(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
