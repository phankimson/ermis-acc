'use strict'

class Permission {
  async wsHandle ({ request }, next) {
    // call next to advance the request
    await next()
  }
}

module.exports = Permission
