'use strict'

const Timeline = use('App/Models/Timeline')
const User = use('App/Models/User')
const Option = use('App/Models/Option')

class GlobalVariable {

async handle ({view, session ,response}, next) {
  var lang_input = session.get('lang')
  var com = JSON.parse(session.get('com'))
  var per = session.get('per')
  var moment = require('moment')
  if(com){
  // options
  const option = await Option.query().Company(com.id).where("code","MAX_TIMELINE").first()
  const timeline = await Timeline.query().where('timeline.company_id',com.id).innerJoin('users', 'users.id', 'timeline.user_id').orderBy('timeline.created_at', 'desc').limit(option.value).select('timeline.*','users.username').fetch()
  const users = await User.query().where('company_id',com.id).fetch()
  view.share({
    timeline : timeline.toJSON(),
    users : users.toJSON(),
    })
  }
  view.share({
    lang : lang_input,
    com : com,
    per : per,
    moment : moment,
  })
    await next()
  }

}

module.exports = GlobalVariable
