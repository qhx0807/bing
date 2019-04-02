const qiniu = require('qiniu')

module.exports = class extends think.Service {

  constructor(mac) {
    super(mac)
    this.mac = mac
    this.HostConfig = {
      host_1: 'http://rs.qbox.me',
      host_2: 'http://rs.qiniu.com',
      host_3: 'http://api.qiniu.com',
      host_4: 'http://uc.qbox.me',
      host_5: 'http://rsf.qbox.me'
    }
  }

  async getObjectList (obj) {
    const { bucket, limit = 10, prefix = '', marker = '', delimiter = '' } = obj
    const requestURI = `${this.HostConfig.host_5}/list?bucket=${bucket}&limit=${limit}&prefix=${prefix}&maker=${marker}&delimiter=${delimiter}`
    const AccessToken = qiniu.util.generateAccessToken(this.mac, requestURI)
    try {
      return await this.fetch(requestURI, { headers: { Authorization: AccessToken } }).then(res => res.json())
    } catch (error) {
      return error.toString()
    }
  }

  async getMetaInfo (bucket, key) {
    const encodedEntryURI = qiniu.util.encodedEntry(bucket, key)
    const requestURI = `${this.HostConfig.host_2}/stat/${encodedEntryURI}`
    const AccessToken = qiniu.util.generateAccessToken(this.mac, requestURI, '')
    try {
      return await this.fetch(requestURI, { headers: { Authorization: AccessToken } }).then(res => res.json())
    } catch (error) {
      return error.toString()
    }
  }

  async setLfiCycle (bucket, key, days) {
    const encodedEntryURI = qiniu.util.encodedEntry(bucket, key)
    const requestURI = `${this.HostConfig.host_2}/deleteAfterDays/${encodedEntryURI}/${days}`
    const AccessToken = qiniu.util.generateAccessToken(this.mac, requestURI, '')
    try {
      return await this.fetch(requestURI, { headers: { Authorization: AccessToken } }).then(res => res.json())
    } catch (error) {
      return error.toString()
    }
  }
}
