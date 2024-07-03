import React, { useState } from "react";
import { useUser } from "./UserContext";

const UserNameInput: React.FC = () => {
    const { userName, setUserName } = useUser();
    const [input, setInput] = useState<string>(userName);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUserName(input);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={input} onChange={handleChange} placeholder="Enter your name" />
            <button type="submit">Set Name</button>
        </form>
    );
};

export default UserNameInput;
