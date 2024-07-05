import { styled } from "styled-components";

export const EditorContainer = styled.div`
    height: 100%;
    border: none;
    .ql-editor {
        height: 100%;
        overflow-y: auto;
        border: none;
    }

    .ql-container {
        overflow: visible;
        // font-family: Georgia, serif;
        // font-size: 16px;

        .ql-snow {
            border: none;
            display: flex;
            justify-content: center;
        }
    }
`;

export const Toolbar = styled.div`
    display: flex;
    margin-top: -60px;
    float: right;
`;

export const Button = styled.button`
    background-color: #f4f4f4;
    color: #444;
    border: none;
    padding: 5px 10px;
    margin-left: 5px;
    cursor: pointer;
    border-radius: 3px;
    display: flex;
    align-items: center;
    font-size: 14px;

    &:hover {
        background-color: white;
    }

    svg {
        margin-right: 5px;
    }
`;
