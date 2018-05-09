'use strict'
  const View = use('View')
class ViewUrl {
  async handle ({ request  }, next) {
    
    let baseUrl = request.secure()? 'https://' : 'http://'
    baseUrl += request.headers().host + '/'

    View.global('link', (path) => {
      if(typeof path != 'undefined') {
        path = (path.substring(0, 1) == '/')
          ? path.substring(1)
          : path
        return baseUrl + path
      }
      return baseUrl
    })
    await next()
  }
}

module.exports = ViewUrl
