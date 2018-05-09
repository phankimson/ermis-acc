'use strict'

class ShortIf {
  async handle ({ request }, next) {
    const View = use('View')
    // call next to advance the request
    View.global('shortif', (con,t,f) => {
     if(eval(con)){
       return t
     }else{
       return f
     }
    })
    await next()
  }
}

module.exports = ShortIf
