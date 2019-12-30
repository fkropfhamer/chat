import * as io from "socket.io";
import Server from "./server";

export default class User {
    private socket: io.Socket;
    private server: Server;

    constructor(socket: io.Socket, server: Server) {
        this.socket = socket;
        this.server = server;

        this.setupSocket();
    }

    private setupSocket(): void {
        this.socket.on("disconnect", this.onDisconnect.bind(this));
        this.socket.on("message", this.onMessage.bind(this));
    }

    private onDisconnect(): void {
        this.server.userDisconnected(this);
    }

    private onMessage(message: string): void {
        this.socket.emit("message", message);
        this.socket.broadcast.emit("message", message);
    }
}
