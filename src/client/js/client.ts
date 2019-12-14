import * as io from "socket.io-client";
import Config from "../../global/config";

export default class Client {

    private socket: SocketIOClient.Socket;
    private isConnected: boolean;

    constructor() {
        this.socket = io(`http://localhost:${Config.PORT}`);
        this.setupSocket();
    }

    private setupSocket() {
        this.socket.on("connect", this.onConnect.bind(this));
        this.socket.on("disconnect", this.onDisconnect.bind(this));
    }

    private onConnect() {
        console.log("connected");
        this.isConnected = true;
    }

    private onDisconnect() {
        this.isConnected = false;
    }

}
