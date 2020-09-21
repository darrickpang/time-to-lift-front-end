import ActionCable from 'actioncable'
import {V2_API_BASE_URL, ACCESS_TOKEN_NAME, CLIENT_NAME, UID_NAME} from '../../globals.js'

chatConnection = (senderId, callback) => {
    let access_token = localStorage.getItem(ACCESS_TOKEN_NAME)
    let client = localStorage.getItem(CLIENT_NAME)
    let base_url = `ws://` + V2_API_BASE_URL + `/cable`
    base_url += `?access-token=` + access_token + '&client=' + client 

    this.senderId = senderId
    this.callback = callback 

    this.connection = ActionCable.createConsumer(base_url)
    this.roomConnections = []
}

chatConnection.prototype.talk = function(message, roomId){
    let roomConn = this.roomConnections.find(conn => conn.roomID === roomId)
    if(roomConn){
        roomConn.conn.speak(message)
    }
    else{
        console.log('No room connection')
    }
}

chatConnection.prototype.newRoom = function(roomId){
    if(roomId !== undefined){
        this.roomConnections.push({roomId: roomId, conn: this.createRoomConnection(roomId)})
    }
}

chatConnection.prototype.disconnect = function(){
    this.roomConnections.forEach(room => room.conn.consumer.connection.close())
}

chatConnection.prototype.createRoomConnection = function(room_code){
    let scope = this 
    return this.connection.subscriptions.create({channel: 'Room_Channel', room_id: room_code, sender: scope.senderId}, {
        connected: function(){
            console.log(`You are connected to room code` + room_code)
        },
        disconnected: function(){},
        received: function(data){
            if(data.participants.indexOf(scope.senderId) !== -1){
                return scope.callback(data)
            }
        },
        speak: function(message){
            return this.perform('speak', {
                room_id: room_code,
                message: message,
                sender: scope.senderId
            })
        }
    })
}

export default chatConnection 