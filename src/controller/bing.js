const Base = require('./base.js')

module.exports = class extends Base {
  async indexAction () {
    // const bingService = think.service('bing-wallpaper')
    // const bingWallpaperModel = think.model('bing_wallpaper')
    // let arr = []
    // for (let i = 118; i > 0; i--) {
    //   let temp = await bingService.bingImage(i)
    //   temp.reverse()
    //   let ids = await bingWallpaperModel.addMany(temp)
    //   arr = arr.concat(ids)
    // }
    // return this.success(arr.length)
    return this.success('aready get')
  }

  async storyAction () {
    // const bingWallpaperModel = think.model('bing_wallpaper')
    // const bingItems = await bingWallpaperModel.where('id > 1685').select()
    // const bingService = think.service('bing-wallpaper')
    // let a = 0
    // for (let i = 0; i < bingItems.length; i++) {
    //   const story = await bingService.bingDailyStory(bingItems[i].href)
    //   let res = await bingWallpaperModel.where({ id: bingItems[i].id }).update(story)
    //   a += res
    // }
    return this.success('aready update')
  }

  async dailyAction () {
    if (!this.isCli) {
      return this.fail('request is not in Cli')
    }
    const bingWallpaperModel = think.model('bing_wallpaper')
    const bingService = think.service('bing-wallpaper')
    const dailyData = await bingService.dailyImage()
    const datestr = think.datetime(new Date(), 'YYYY-MM-DD')
    const story = await bingService.bingDailyStory(dailyData.href)
    const obj = Object.assign(dailyData, story)
    if (obj.date === datestr) {
      let insertId = await bingWallpaperModel.add(obj)
      return this.success(insertId)
    } else {
      return this.fail()
    }
  }

  async getimgAction () {
    const dateStr = this.get('date') || think.datetime(new Date(), 'YYYY-MM-DD')
    const bingWallpaperModel = think.model('bing_wallpaper')
    const result = await bingWallpaperModel.where({ date: dateStr }).select()
    if (!think.isEmpty(result)) {
      return this.success(result[0])
    } else {
      return this.fail()
    }
  }

  async bingimgsAction () {
    const bingWallpaperModel = think.model('bing_wallpaper')
    const page = this.get('p') || 1
    const size = this.get('s') || 10
    let data = await bingWallpaperModel.order('id DESC').page(page).countSelect({ limit: size })
    return this.success(data)
  }
}
