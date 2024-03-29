import * as io from "socket.io";
import Server from "./server";

export default class User {
    private socket: io.Socket;
    private server: Server;
    private username = "";

    constructor(socket: io.Socket, server: Server) {
        this.socket = socket;
        this.server = server;

        this.setupSocket();
    }

    private setupSocket(): void {
        this.socket.on("disconnect", this.onDisconnect.bind(this));
        this.socket.on("message", this.onMessage.bind(this));
        this.socket.on("set_username", this.onSetUserName.bind(this));
    }

    private onDisconnect(): void {
        this.server.userDisconnected(this);
    }

    private onMessage(text: string): void {
        const message = {
            username: this.username,
            text
        }
        this.socket.emit("message", message);
        this.socket.broadcast.emit("message", message);
    }

    private onSetUserName(username: string): void {
        this.username = username;
    }
}
