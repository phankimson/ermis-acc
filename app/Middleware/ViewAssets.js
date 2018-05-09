'use strict'

class ViewAssets {
  async handle ({ request  }, next) {
    const View = use('View')
    // call next to advance the request
    let baseUrl = request.secure()? 'https://' : 'http://'
    baseUrl += request.headers().host + '/assets/'

    View.global('assets', (assetPath) => {
      assetPath = (assetPath.substring(0, 1) == '/')
        ? assetPath.substring(1)
        : assetPath
      return baseUrl + assetPath
    })
    await next()
  }
}

module.exports = ViewAssets
