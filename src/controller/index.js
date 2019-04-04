const Base = require('./base.js')

module.exports = class extends Base {
  async indexAction () {
    const page = this.get('p') || 1
    const bingWallpaperModel = think.model('bing_wallpaper')
    const data = await bingWallpaperModel.order('id DESC').page(page).countSelect()
    const obj = {
      data: data.data,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
      pageSize: data.pageSize,
      Prev: data.currentPage === 1 ? 1 : data.currentPage - 1,
      Next: data.currentPage === data.totalPages ? data.totalPages : data.currentPage + 1
    }
    this.assign(obj)
    return this.display()
  }
}
