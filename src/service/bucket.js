const qiniu = require('qiniu')

module.exports = class extends think.Service {

  constructor(mac) {
    super()
    this.mac = mac
    this.HostConfig = {
      host_1: 'http://rs.qbox.me',
      host_2: 'http://rs.qiniu.com',
      host_3: 'http://api.qiniu.com',
      host_4: 'http://uc.qbox.me'
    }
  }

  async getBucketsList () {
    const requestURI = this.HostConfig.host_1 + '/buckets'
    const AccessToken = qiniu.util.generateAccessToken(this.mac, requestURI)
    try {
      return await this.fetch(requestURI, { headers: { Authorization: AccessToken } }).then(res => res.json())
    } catch (error) {
      return error.toString()
    }
  }

  async domainList (name) {
    const requestURI = `${this.HostConfig.host_3}/v6/domain/list?tbl=${name}`
    const AccessToken = qiniu.util.generateAccessToken(this.mac, requestURI, '')
    try {
      return await this.fetch(requestURI, { headers: { Authorization: AccessToken } }).then(res => res.json())
    } catch (error) {
      return error.toString()
    }
  }

  async createBucket (name, region) {
    const requestURI = `${this.Host_Config.host_2}/mkbucketv2/${name}/region/${region}`
    const AccessToken = qiniu.util.generateAccessToken(this.mac, requestURI, '')
    try {
      return await this.fetch(requestURI, { headers: { Authorization: AccessToken } }).then(res => res.json())
    } catch (error) {
      return error.toString()
    }
  }

  async dropBucket (name) {
    const requestURI = `${this.Host_Config.host_2}/drop/${name}`
    const AccessToken = qiniu.util.generateAccessToken(this.mac, requestURI, '')
    try {
      return await this.fetch(requestURI, { headers: { Authorization: AccessToken } }).then(res => res.json())
    } catch (error) {
      return error.toString()
    }
  }
};
