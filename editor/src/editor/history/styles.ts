import { styled } from "styled-components";

export const Container = styled.div`
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    position: fixed;
    top: 100px;
    right: 20px;
    width: 15vw;
    background: rgba(0, 0, 0, 0.02);
`;

export const VersionList = styled.ul`
    list-style: none;
    padding: 0;
`;

export const VersionItem = styled.li`
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: #fafafa;
    border-radius: 5px;
`;

export const Button = styled.button`
    background-color: #fafafa;
    color: #444;
    border: none;
    padding: 5px 20px;
    margin-left: 5px;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #d0d0d0;
    display: flex;
    align-items: center;
    font-size: 16px;

    &:hover {
        background-color: #fff;
        border-color: #aaa;
    }
`;
