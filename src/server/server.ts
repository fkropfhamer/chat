import { createServer } from "http";
import { Server, Socket } from "socket.io";
import Config from "../global/config";
import User from "./user";

export default class App {
    private socket: any;
    private server: any;
    private connectedUsers: User[] = [];

    constructor() {
        this.server = createServer();
        this.socket = new Server(this.server, {
            cors: {
                origin: "http://localhost:1234",
                methods: ["GET", "POST"]
            }
        });

        this.server.listen(Config.PORT, () => {
        console.log(`server listening on *:${Config.PORT}`);
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
