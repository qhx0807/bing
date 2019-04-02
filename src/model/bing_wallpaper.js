module.exports = class extends think.Model {
  getImgList (page) {
    return this.page(page).countSelect()
  }
}
