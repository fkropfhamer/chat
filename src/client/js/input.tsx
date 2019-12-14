import * as React from "react";

interface IProps {
    label: string;
}

interface IState {
    input: string;
}

export default class Input extends React.Component<IProps> {
    public state: IState;

    constructor(props: IProps) {
        super(props);
        this.state = {
            input: "",
        };
    }

    public render(): JSX.Element {
        return (
            <div>
                <input></input>
            </div>
        );
    }
}
