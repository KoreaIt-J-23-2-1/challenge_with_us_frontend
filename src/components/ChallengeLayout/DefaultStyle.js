import { css } from '@emotion/react';

export const Layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
`;

export const TitleLayout = css`
    position: absolute;
    top: 0px;
    left: 50px;

    & b {
        margin: 0px 10px;
    }
`;

export const textLayout = css`
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 50px;
    top: 100px;
    width: 95%;
`;

export const textareaBox = css`
    display: flex;
    flex-grow: 1;
    resize: none;
    border-radius: 10px;
    transition: width 0.3s;
    width: 100%;
`;

export const imagePreview = css`
    margin-left: 50px;
    max-width: 100%;
    max-height: 500px;
    border-radius: 10px;
`;

export const FileBox = css`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const SaveButton = css`
    position: absolute;
    right: 30px;
    bottom: 30px;
    width: 100px;
    height: 30px;
    background-color: transparent;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    cursor: pointer;

    &:active {
        background-color: #dbdbdb;
    }
`;