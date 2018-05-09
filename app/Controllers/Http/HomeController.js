'use strict'
const HistoryAction = use('App/Classes/HistoryAction')
const Token = use('App/Models/Token')
class HomeController {
  async test ({view, response}){
      const index = await view.render('test')
      response.send(index)
  }
  async index ({view, response}){
      const index = await view.render('index')
      response.send(index)
  }
  async show ({view, response}){
      const index = await view.render('manage.pages.index')
      response.send(index)
  }
  async block ({view, response}){
      const index = await view.render('block')
      response.send(index)
  }
  async login ({view, auth, response}){
     try {
       await auth.check()
       response.redirect('index')
      } catch (error) {
        const recaptcha = use('Recaptcha')
        const index = await view.render('login',{recaptcha : recaptcha})
        response.send(index)
      }
   }

   async register ({view, response}){
       const index = await view.render('register')
       response.send(index)
   }


     async logout({auth, session, response}) {
       try{
         // Lưu lịch sử
         let hs = new HistoryAction()
         var rs = hs.insertRecord(0,auth.user.id,0,'')
         await rs.save()
         //
         const token = await Token.findBy('user_id',auth.user.id)
         await token.delete()
          await auth.logout()
          session.forget('com')
      }catch(e){

      }

       return response.redirect('/')
  }

}

module.exports = HomeController
