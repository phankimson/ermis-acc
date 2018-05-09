'use strict'

const View = use('View')

class currentUrl {

  async handle ({request, response}, next) {
    const View = use('View')
    View.global('currentUrl', (url,active) => {
      var link = request.url().substr(1)
      return url == link ? active : ''
    })

    await next()
  }

}

module.exports = currentUrl
