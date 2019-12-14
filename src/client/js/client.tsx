import * as React from "react";
import {Component} from "react";
import * as io from "socket.io-client";
import Config from "../../global/config";
import View from "./view";

interface IState {
    isConnected: boolean;
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
        };
    }

    public render() {
        return <View isConnected={this.state.isConnected}/>;
    }

    private setupSocket() {
        this.socket.on("connect", this.onConnect.bind(this));
        this.socket.on("disconnect", this.onDisconnect.bind(this));
    }

    private onConnect() {
        this.setState({isConnected: true});
        this.testo = false;
    }

    private onDisconnect() {
        this.setState({isConnected: false});
    }

}
