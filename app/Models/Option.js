'use strict'

const Model = use('Model')

class Option extends Model {
  static get table () {
    return 'options'
  }
  static get createdAtColumn () {
    return 'created_at'
  }
  static get updatedAtColumn () {
   return 'updated_at'
   }
   static get deletedAtColumn () {
     return null
   }

   static scopeCompany (query,value) {
     if(value){
      query.where('company_id',value)
     }
    }

   static scopeTypeWhere (query,column,value) {
     if(value){
      query.where(column,value)
     }
      query.whereNotNull(column)
    }
    static scopeOrTypeWhere (query,column,value) {
      if(value){
       query.orWhere(column,value)
      }
       query.whereNotNull(column)
     }
    static scopeTypeWhereIn (query,column,value) {
      if(value){
       query.whereIn(column,value)
      }
       query.whereNotNull(column)
     }
     static scopeTypeWhereNot (query,column,value) {
       if(value){
        query.where(column,value)
       }
        query.whereNot(column,0)
      }
      static scopeOrTypeWhereNot (query,column,value) {
        if(value){
         query.orWhere(column,value)
        }
         query.whereNot(column,0)
       }
}

module.exports = Option
