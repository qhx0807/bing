module.exports = class extends think.Logic {
  async indexAction () {
    this.allowMethods = 'post'
    this.rules = {
      username: {
        string: true,
        required: true,
        trim: true
      },
      password: {
        string: true,
        required: true
      }
    }
  }
};
