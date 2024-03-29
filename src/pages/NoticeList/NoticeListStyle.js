import { css } from '@emotion/react';

export const Header = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    width: 100%;
    margin-top: 20px;
    border-bottom: 2px solid #dbdbdb;
    
    & b {
        width: 100%;
    }
`;


export const btnBox = css`
    display: flex;
    justify-content: end;
    width: 938px;

    & > button{
        width: 80px;
        height: 30px;
        background: rgba(255, 255, 255, 0.4); 
        border-radius: 10px; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        border: none;
        cursor: pointer;

        &:active {
            background-color: #dbdbdb;
        }

        &:hover {
            background-color: #eee;
        }
    }
`;

export const TableBox = css`
    display: flex;
    align-items: start;
    justify-content: center;
    margin-top: 20px;
    background: rgba(255, 255, 255, 0.4); 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    height:660px;
    width: 100%;
`;

export const TitleBox = css`
    height: 50px;
    width: 100%;

    &>th:nth-of-type(1){
        width: 10%;
    }
    &>th:nth-of-type(3){
        width: 20%;
    }
    &>th:nth-of-type(4){
        width: 20%;
    }
`;

export const listTable = css`
    width: 1050px;
    border-collapse: collapse;

    & th, td, tr{
        text-align: center;
        height: 47px;
    }
    & td {
        cursor: pointer;
    }
`;

export const noticeTitle = css`
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const SPageNumbers = css`
    display: flex;
    align-items: center;
    margin-top: 10px;
    width: 200px;
    
    & button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 3px;
        width: 20px;
        border: 1px solid #dbdbdb;
        cursor: pointer;
    }
`;
