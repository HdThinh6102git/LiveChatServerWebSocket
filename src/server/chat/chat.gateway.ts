import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer() server;
    users: number = 0;
    handleConnection() {
        // A client has connected
        this.users++;

        // Notify connected clients of current users
        this.server.emit('users', this.users);
    }

    handleDisconnect(){
        // A client has disconnected
        this.users--;

        // Notify connected clients of current users
        this.server.emit('users', this.users);
    }
    @SubscribeMessage('chat')
    async onChat(client, message) {
        client.broadcast.emit('chat', message);
    }

}