import * as React from "react";

type Props = {
    users: string[]
}

export default function UserList(props: Props): JSX.Element  {
    return (
        <div>
            <h1>Userlist:</h1>
            {props.users.map((user, i) => <p key={i}>{user}</p>)}
        </div>
    )
}