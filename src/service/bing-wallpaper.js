const cheerio = require('cheerio')

module.exports = class extends think.Service {
  async bingImage (page = 1) {
    const url = 'https://www.prohui.com/plugin.php?id=mini_download:index&c=14&types=time&page=' + page
    const htmlText = await this.fetch(url).then(res => res.text())
    const $ = cheerio.load(htmlText)
    let arr = []
    $('.item').each(function (i, elem) { // do not use arrow function
      let obj = {
        cdnurl: $(this).find('img').attr('src').replace('?imageView2/1/w/500/h/284/q/50', ''),
        title: $(this).find('img').attr('alt').replace('必应壁纸 ', ''),
        date: $(this).find('.z').text().substring(0, 10),
        href: $(this).find('a').attr('href')
      }
      arr.push(obj)
    })
    return arr
  }

  async bingDailyStory (href) {
    const url = 'https://www.prohui.com/' + href
    const htmlText = await this.fetch(url).then(res => res.text())
    const $ = cheerio.load(htmlText)
    const obj = {
      story: $('.wallpaper_title').find('p').text().replace('必应壁纸 ', '')
    }
    return obj
  }

  async dailyImage () {
    const url = 'https://www.prohui.com/wallpaper/14'
    const htmlText = await this.fetch(url).then(res => res.text())
    const $ = cheerio.load(htmlText)
    let obj = {}
    $('.item').each(function (i, elem) { // do not use arrow function
      if (i === 0) {
        obj = {
          cdnurl: $(this).find('img').attr('src').replace('?imageView2/1/w/500/h/284/q/50', ''),
          title: $(this).find('img').attr('alt').replace('必应壁纸 ', ''),
          date: $(this).find('.z').text().substring(0, 10),
          href: $(this).find('a').attr('href')
        }
      }
    })
    return obj
  }
}
