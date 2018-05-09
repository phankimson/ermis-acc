'use strict'
const Hash = use('Hash')
const Antl = use('Antl')
const HistoryAction = use('App/Classes/HistoryAction')
const User = use('App/Models/User')
const Company = use('App/Models/Company')

class UserController {
  async login ({request, auth , response ,session}) {
    const data = JSON.parse(request.input('data'))
    const username = data.username
    const password = data.password
    const captcha = data['g-recaptcha-response']
    try {
    const login = await auth.remember(true).attempt(username,password)
    if (login) {
      // Lưu lịch sử đăng nhập
      let hs = new HistoryAction()
      var rs = hs.insertRecord(1,auth.user.id,0,'')
      await rs.save()
      //
      const com = await Company.find(auth.user.company_id)
      session.put('com', JSON.stringify(com) )

      response.json({ status: true , message : Antl.formatMessage('messages.login_success')})
      return
    }
    response.json({ status: false , message: Antl.formatMessage('messages.login_fail')})
    } catch (e) {
    response.json({ status: false ,error : true , message: Antl.formatMessage('messages.error')})
    }
  }

  async doRegister({request, response}) {
    try{
      const data = JSON.parse(request.input('data'))
      const check = await User.query().where('username',data.username).orWhere('email',data.email).first()
      if(check && check.id != data.id){
        response.json({ status: false, message: Antl.formatMessage('messages.duplicate_username')  })
      }else{
       const user = new User()
       user.fullname = data.fullname
       user.firstname = data.firstname
       user.lastname = data.lastname
       user.phone = data.phone
       user.birthday = data.birthday?data.birthday:'0000-00-00'
       user.jobs = data.jobs
       user.address = data.address
       user.city = data.city
       user.country = data.country
       user.about = data.about
       user.identity_card = data.identity_card
       user.username = data.username
       user.email = data.email
       user.password = data.password
       await user.save()
        response.json({ status: true , message: Antl.formatMessage('messages.register_success')})
     }
    }catch(e){
      response.json({ status: false ,error : true, message: Antl.formatMessage('messages.error')+' ' + e.message})
    }

}

}

module.exports = UserController
