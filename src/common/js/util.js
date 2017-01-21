'use strict'
const ERR_OK = 0
const prefix = 'm-reader_'

const getBSONP = (url, callback) => {
  return window.$.jsonp({
    url,
    cache: true,
    callback: 'duokan_fiction_chapter',
    success (result) {
      let data = window.$.base64.decode(result)
      let json = JSON.parse(decodeURIComponent(escape(data)))
      callback && callback(json)
    }
  })
}

exports.getChapters = (callback) => {
  window.$.get('/api/chapter', (data) => {
    if (data.result === ERR_OK) {
      callback && callback(data)
    }
  }, 'json')
}

exports.getChapterContent = (id, callback) => {
  window.$.get(`api/data?id=${id}`, (data) => {
    if (data.result === ERR_OK) {
      let url = data.jsonp
      getBSONP(url, (data) => {
        callback && callback(data)
      })
    }
  }, 'json')
}

exports.storageGetter = (key) => window.localStorage.getItem(prefix + key)

exports.storageSetter = (key, val) => window.localStorage.setItem(prefix + key, val)
