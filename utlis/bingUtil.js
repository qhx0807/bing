var request = require('superagent')
var objectAssign = require('object-assign')
var commonUtil = require('./common')

var imgUrl = 'https://www.bing.com/HPImageArchive.aspx'
var storyUrl = 'https://cn.bing.com/cnhp/coverstory/'
var userAgent = {'user-agent' : 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'}

module.exports = {
  /**
   * 获取当日bing数据
   * @param
   */
  fetchDailyPic: function (options, callback) {
    var opts = {
      idx: 0,
      n: 2,
      format: 'js'
    }
    if (Object.prototype.toString.call(options) == '[object Object]') {
      opts = objectAssign(opts, options)
    } else {
      callback = options
    }
    request
      .get(imgUrl)
      .set(userAgent)
      .query(opts)
      .end(function (err, res) {
        commonUtil.errProcess(err, res, function (data) {
          for (let i = 0; i < data.images.length; i++) {
            var img = data.images[i]
            module.exports.fetchStory({d: img['enddate']}, function (rows) {
              var rows = objectAssign(img, rows)
              var newData = {
                startdate: rows.startdate,
                fullstartdate: rows.fullstartdate,
                enddate: rows.enddate,
                url: /(http|https)\:\/\//gi.test(data.url) ? data.url : 'http://s.cn.bing.net' + rows.url,
                urlbase: rows.urlbase,
                copyright: rows.copyright,
                copyrightlink: rows.copyrightlink,
                hsh: rows.hsh,
                title: rows.title,
                description: rows.description,
                attribute: rows.attribute,
                country: rows.country,
                city: rows.city,
                longitude: rows.longitude,
                latitude: rows.latitude,
                continent: rows.continent,
                provider: rows.provider,
                imageurl: rows.imageUrl,
                cityinenglish: rows.CityInEnglish,
              }
              callback && callback(newData)
            })
          }

        })
      })
  },

  /**
   * 获取每张图的每日故事
   * @param: {d: Number}
   * d = 20170909
   */
  fetchStory: function (options, callback) {
    if (Object.prototype.toString.call(options) === '[object Function]') {
      callback = options
      options = {}
    }
    request
      .get(storyUrl)
      .set(userAgent)
      .query(options)
      .end(function (err, res) {
        commonUtil.errProcess(err, res, function (data) {
          data['description'] = data.para1 || data.para2 || ''
          data['country'] = data.Country || ''
          data['city'] = data.City
          data['longitude'] = data.Longitude || ''
          data['latitude'] = data.Latitude || ''
          data['continent'] = data.Continent || ''
          callback && callback(data)
        })
      })
  }
}

