import React, { useEffect, useState } from "react";
import { WebsocketProvider } from "y-websocket";
import { PresenceContainer, UserItem, UserList, WhoAmI } from "./IdentityStyles";
import { useUrlParams } from "../hooks";

interface Props {
    provider: WebsocketProvider | null;
}

interface ICollaborator {
    id: number;
    name: string;
    color: string;
}

const UserPresence: React.FC<Props> = ({ provider }) => {
    const [users, setUsers] = useState<ICollaborator[]>([]);
    const { userName } = useUrlParams();

    useEffect(() => {
        if (!provider) return;

        const updateUsers = () => {
            const states = provider.awareness.getStates();
            const userList: ICollaborator[] = [];

            states.forEach((state, clientId) => {
                if (state.user) {
                    userList.push({ id: clientId, name: state.user.name, color: state.user.color });
                }
            });

            setUsers(userList);
        };

        provider.awareness.on("change", updateUsers);

        // Initial update
        updateUsers();

        return () => {
            provider.awareness.off("change", updateUsers);
        };
    }, [provider]);

    return (
        <PresenceContainer>
            <h4>Current Users</h4>
            <UserList>
                {users.map(user => (
                    <UserItem key={user.id} style={{ borderLeft: `5px solid ${user.color}` }}>
                        {user.name === userName ? (
                            <>
                                {user.name} <WhoAmI>(You)</WhoAmI>
                            </>
                        ) : (
                            <>{user.name}</>
                        )}
                    </UserItem>
                ))}
            </UserList>
        </PresenceContainer>
    );
};

export default UserPresence;
