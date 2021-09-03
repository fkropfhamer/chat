import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { port, socketConfig } from "../global/config";
import User from "./user";

export default class App {
    private socket: any;
    private server: any;
    private connectedUsers: User[] = [];

    constructor() {
        this.server = createServer();
        this.socket = new Server(this.server, socketConfig);

        this.server.listen(port, () => {
        console.log(`server listening on *:${port}`);
        });

        this.socket.on("connection", (socket: Socket) => {
            console.log("user connected");
            const newUser = new User(socket, this);
            this.connectedUsers.push(newUser);
        });
    }

    public userDisconnected(user: User): void {
        console.log("user disconnected");
        this.connectedUsers = this.connectedUsers.filter((u: User) => !Object.is(u, user));
    }

}
