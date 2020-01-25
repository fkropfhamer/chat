import * as React from 'react';

interface Props {
    sendUsername: (username: string) => void;
}

export default function Username(props: Props) {
    const [username, setUsername] = React.useState(
        ''
    );

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
        props.sendUsername(username)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Choose Username:
                <input type="text" value={username} onChange={handleChange}/>
            </label>
            <input type="submit" value="send"/>
        </form>
    )
}