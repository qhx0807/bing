const qiniu = require('qiniu')
const Base = require('./base.js')

module.exports = class extends Base {

  constructor (ctx) {
    super(ctx)
    this.qiniu_Mac = null
    this.objectService = null
  }

  async __before () {
    const userInfo = await this.session('userInfo')
    if (think.isEmpty(userInfo)) return this.fail(401, '请登录')
    if (userInfo.accesskey && userInfo.secretkey) {
      this.qiniu_Mac = new qiniu.auth.digest.Mac(userInfo.accesskey, userInfo.secretkey)
      this.objectService = think.service('object', this.qiniu_Mac)
    } else {
      return this.fail(401, '获取key失败')
    }
  }

  async listAction () {
    const obj = this.get()
    const result = await this.objectService.getObjectList(obj)
    return this.success(result)
  }

  async metainfoAction () {
    const { bucket, key } = this.get()
    const result = await this.objectService.getMetaInfo(bucket, key)
    return this.success(result)
  }

  async lifeCycleAction () {
    const { bucket, key, days } = this.get()
    const result = await this.objectService.setLfiCycle(bucket, key, days)
    return this.success(result)
  }

}
