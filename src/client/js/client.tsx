import * as React from "react";
import {Component} from "react";
import * as io from "socket.io-client";
import Config from "../../global/config";

interface IState {
    isConnected: boolean;
    message: string;
    messages: string[];
}

export default class Client extends Component {
    public state: IState;

    private socket: SocketIOClient.Socket;
    private testo: boolean = true;

    constructor(props: null) {
        super(props);
        this.socket = io(`http://localhost:${Config.PORT}`);
        this.setupSocket();
        this.state = {
            isConnected: false,
            message: "",
            messages: [],
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public render() {
        return(
            <div>
                <h1>{this.state.isConnected ? "connected" : "disconnected"}</h1>
                {this.state.messages.map((message, i) => <h1 key={i}>{message}</h1>)}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Message:
                        <input type="text" name="message" value={this.state.message} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Send" />
                </form>
            </div>
        )
    }

    private handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        this.socket.emit("message", this.state.message);
        this.setState({message: ""});
        event.preventDefault();
    }

    private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({message: event.target.value});
    }

    private setupSocket() {
        this.socket.on("connect", this.onConnect.bind(this));
        this.socket.on("disconnect", this.onDisconnect.bind(this));
        this.socket.on("message", this.onMessage.bind(this));
    }

    private onConnect() {
        this.setState({isConnected: true});
        this.testo = false;
    }

    private onDisconnect() {
        this.setState({isConnected: false});
    }

    private onMessage(message: string) {
        const newMessages = [...this.state.messages, message]
        this.setState({messages: newMessages});
    }

}
