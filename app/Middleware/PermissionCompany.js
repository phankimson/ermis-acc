'use strict'

const UserPermission = use('App/Models/UserPermission')
const User = use('App/Models/User')
const Bitmask = use('App/Classes/bitmask-ermis')
const Company = use('App/Models/Company')

class PermissionCompany {
  async handle ({ request, view , auth ,session , locale ,response }, next) {
    // call next to advance the request
    const Antl = use('Antl')
    const lang = session.get('lang') ? session.get('lang') : locale
    const link = request.url()
    const load = ['manage','acc']
    var manage = ''
    var skip = false
    const skip_load = ['login','logout','block']
    var i = 0
    for(i in load){
      if(link.search(load[i]) > 0){
          manage = load[i]
          break
      }
    }
    for(var s in skip_load){
      if(link == '/'+manage+'/'+skip_load[s]){
          skip = true
          break
      }
    }
    view.share({type : parseInt(i)+1})

    if(link != '/' && skip == false && manage != '' && request.method() == "GET"){
      const user = auth.user
          if(user){
            const com = await Company.find(auth.user.company_id)
            session.put('com', JSON.stringify(com) )
              var permission = 0;
              if(user.role == 1 || user.role == 2){
                permission = 63
              }else{
                const per = await UserPermission.query().where('user_id',user.id).where('company_id',com.id).innerJoin('menu', 'menu.id', 'user_permission.menu_id').where('menu.link',link.substr(1)).first()
                if(per){
                permission = per.permission;
                }
              }
              var bitmask = new Bitmask();
              var arr = bitmask.getPermissions(permission)
              if(arr.v === true){
                 session.put('per', JSON.stringify(arr))
              }else{
                response.redirect(skip_load[2]+'?lang=' + lang)
                 return
              }

          }else{
              await auth.logout()
              session.forget('com')
              response.redirect(skip_load[0]+'?lang=' + lang)
              return
          }
      }

    await next()
  }

}

module.exports = PermissionCompany
