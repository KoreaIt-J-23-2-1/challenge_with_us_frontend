import { css } from '@emotion/react';

export const LetterSideBarLayout = css`
    overflow: hidden;
    position: relative;
    width: 400px;
    border-radius: 10px 0px 0px 10px;
    padding: 0px 10px;
    border: 5px solid #EED2C7;
    background-color: #FFF4D8;

`;

export const SLetterScroll = css`
    height: 800px;
    width: 800px;
    overflow-y: scroll;
`;

export const miniLetter = css`
    word-wrap: break-word;
    cursor: pointer;
    width: 380px;
    border-bottom: 1px solid #dbdbdb;
    padding: 5px;
`;

export const lettersHeader = css`
    display: flex;
    justify-content: flex-end;
`;

export const letterContent = css`
    max-width: 350px;
    width: 350px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const modalCloseBtn = css`
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
`;

export const modalContainer = css`
    margin: auto;
`;

export const modalTitle = css`
    display: flex;
    justify-content: center;
    cursor: pointer;
`;

export const modalFrom = css`

`;

export const modalDate = css`

`;

export const modalContent = css`
    padding: 20px;
    height: 170px;
    white-space: normal;
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const modalBottom = css`
    display: flex;
    justify-content: center;
`;