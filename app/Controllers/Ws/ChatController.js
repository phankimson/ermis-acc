'use strict'
var currentAllSocket = [];
class ChatController {

  constructor ({socket , auth}) {
    this.socket = socket
    var currentUser = auth.user
    // Lưu lại tất cả userid + socket
    if(currentAllSocket.filter(x => x.user === currentUser.id).length > 0){
      var index = -1;
      var val = currentUser.id
      var filteredObj = currentAllSocket.find(function(item, i){
      if(item.user === val){
        index = i;
        return i;
      }
      });
      currentAllSocket[index].socket = this.socket.id
      currentAllSocket[index].reconnect = true
      socket.broadcastToAll('server-check-online', { 'current_user' : currentUser , 'user_all' : currentAllSocket , 'reconnect' : true})
    }else{
      if(currentUser.id ){
      currentAllSocket.push({"user": currentUser.id ,"socket": this.socket.id , "reconnect" : false})
      }
      // Kiểm tra session user Báo kết nối tới server
      //console.log(currentAllSocket)
      socket.broadcastToAll('server-check-online', { 'current_user' : currentUser , 'user_all' : currentAllSocket , 'reconnect' : false})
    }

    // Nhận tin nhắn từ client
    socket.emit('client-send-data', function (data) {
    // Kiểm tra coi tin nhắn có send cho server
    //console.log('received message',data)
    // Trả lại tin nhắn tới các client
    socket.broadcastToAll('server-send-data', data)
    })
    // Nhận tin nhắn từ client
    socket.emit('client-send-data-user', function (data) {
    // Kiểm tra coi tin nhắn có send cho server
    //console.log('received message',data)
    // Tìm socket.id user receipt
    var user = currentAllSocket.filter(x => x.user == data.user_receipt)
    // Trả lại tin nhắn tới 1 user
    socket.emitTo('server-send-data-user', data,[user[0].socket])
    })

  }

  onMessage (message) {
// listening for message event

  }

    //* joinRoom (room, body, socket) {
      // socket
//  }

onError () {
  // same as: socket.on('error')
}

  onClose ({socket}){
      this.socket = socket
      var currentUser = auth.user
     setTimeout(function () {
       var user = currentAllSocket.filter(x => x.user === currentUser.id)
       if(user){
         if(user[0].reconnect === false){
           socket.broadcastToAll('server-check-offline', currentUser)
            currentAllSocket = currentAllSocket.filter(x => x.user != currentUser.id)
         }else{
           var index = -1;
           var val = currentUser.id
           var filteredObj = currentAllSocket.find(function(item, i){
           if(item.user === val){
             index = i;
             return i;
           }
           });
           currentAllSocket[index].reconnect = false
         }
       }
     }, 3000)
      //socket.toEveryone().emit('server-check-offline', this.socket.currentUser)
    //  currentAllSocket = currentAllSocket.filter(x => x.user != this.socket.currentUser.id)
    //console.log(currentAllSocket)
    // const user = yield User.findBy('id',request.currentUser.id);
    // user.socket = null
    // yield user.save()
  }
}
module.exports = ChatController
