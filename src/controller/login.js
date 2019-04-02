const Base = require('./base.js')

module.exports = class extends Base {
  async indexAction () {
    const { username, password } = this.post()
    const user = this.model('qn_account')
    const userInfo = await user.where({ name: username }).find()
    if (think.isEmpty(userInfo)) return this.fail('用户不存在')
    if (userInfo.password !== password) return this.fail('密码不正确')
    delete userInfo.password
    user.where({ name: username }).update({ last_login_time: new Date().getTime() / 1000 })
    const token = await this.session('userInfo', userInfo)
    this.success({token: token, ...userInfo })
  }
}
