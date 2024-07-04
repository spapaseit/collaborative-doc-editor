import { styled } from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    //background-color: #1e2a38;
    background-color: #f4f4f4;
`;

export const FormContainer = styled.div`
    //background: #2b3e50;
    background: #444;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 300px;
`;

export const Title = styled.h2`
    color: #ffffff;
    margin-bottom: 20px;
`;

export const Input = styled.input`
    width: calc(100% - 20px);
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    font-size: 16px;
`;

export const Button = styled.button`
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #218838; /* Adjust the hover color to match your scheme */
    }
`;
