'use strict'
const Antl = use('Antl')
class Language {
  async handle ({ request , response ,session , antl , locale ,view  }, next) {
    const lang = session.get('lang') ? session.get('lang') : locale
    const lang_input = request.input('lang') ?  request.input('lang')  : lang
    session.put('lang', lang_input)
    if (lang != lang_input && request.method() == "GET") {
      // asynchronous
      await Antl.bootLoader()

      // Otherwise, set current locale
      Antl.switchLocale(lang_input)

      return response.redirect(request.url() + '?lang=' + lang_input)
    }
    await next()
  }
}

module.exports = Language
