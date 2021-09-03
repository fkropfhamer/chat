import * as React from "react";
import { Message } from "../../global/message";

interface Props {
    messages: Message[];
    sendMessage: (message: string) => void
}

export default function Chat(props: Props) {
    const [message, setMessage] = React.useState(
        ''
    );

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMessage(event.target.value);
    }

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>): void {
        props.sendMessage(message)
        setMessage("");
        event.preventDefault();
    }

    return (
        <div>
            {props.messages.map((message, i) => <h1 key={i}>{`${message.username}: ${message.text}`}</h1>)}
            <form onSubmit={handleSubmit}>
                <label>
                    Message:
                    <input type="text" name="message" value={message} onChange={handleChange} />
                </label>
                <input type="submit" value="Send" />
            </form>
        </div>
    )
}