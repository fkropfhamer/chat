import {Component} from "react";
import * as React from "react";

interface IProps {
    isConnected: boolean;
}

export default class View extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div>
                <h1>{this.props.isConnected ? "connected" : "disconnected"}</h1>
            </div>
        );
    }
}
