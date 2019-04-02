const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }
  async testAction () {
    let d = await this.model('qn_account').select()
    this.success(d)
  }
  async sessAction () {
    let token = await this.session('name1', '12312312321')
    this.success(token)
  }
  async sess1Action () {
    let d = await this.session('name')
    this.success(d)
  }
};
