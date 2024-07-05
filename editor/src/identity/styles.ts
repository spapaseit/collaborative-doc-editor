import styled from "styled-components";

export const PresenceContainer = styled.div`
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    position: fixed;
    top: 100px;
    left: 20px;
    width: 15vw;
    background: rgba(0, 0, 0, 0.02);
`;

export const UserList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

export const UserItem = styled.li`
    margin: 5px 0;
    padding: 10px;
    background: #fafafa;
    display: flex;
    align-items: center;
    border-radius: 5px;
`;

export const WhoAmI = styled.span`
    color: #bbb;
    font-size: 0.7em;
    margin-left: 5px;
`;
