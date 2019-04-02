const qiniu = require('qiniu')
const Base = require('./base.js')

module.exports = class extends Base {

  constructor(ctx){
    super(ctx)
    this.qiniu_Mac = null
    this.bucketService = null
  }

  async __before () {
    const userInfo = await this.session('userInfo')
    if (think.isEmpty(userInfo)) return this.fail(401, '请登录')
    if (userInfo.accesskey && userInfo.secretkey) {
      this.qiniu_Mac = new qiniu.auth.digest.Mac(userInfo.accesskey, userInfo.secretkey)
      this.bucketService = think.service('bucket', this.qiniu_Mac)
    } else {
      return this.fail(401, '获取key失败')
    }
  }

  indexAction () {
    return this.success('success')
  }

  async bucketsAction () {
    const result = await this.bucketService.getBucketsList()
    return this.success(result)
  }

  async domainAction () {
    const bucketName = this.get('bucket')
    const result = await this.bucketService.domainList(bucketName)
    return this.success(result)
  }

  async createAction () {
    const { name, region } = this.post()
    const safeName = qiniu.util.urlsafeBase64Encode(name)
    const result = await this.bucketService.createAction(safeName, region)
    return this.success(result)
  }

  async dropAction () {
    const name = this.get('name')
    const result = this.bucketService.dropBucket(name)
    return this.success(result)
  }

}
