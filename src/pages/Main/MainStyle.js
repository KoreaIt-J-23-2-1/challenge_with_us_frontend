import { css } from '@emotion/react';
import LogoImg from '../../img/메인로고.png';


export const MainBase = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
`;

export const MainBox = css`
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 860px;
    
    &>div{
        width: 100%;
        display: flex;
    }
`;

export const part1 = css`
    height: 640px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const part2 = css`
    display:flex;
    align-items: center;
    height: 200px;
    width: 900px;
`;




export const part3 = css`
    height: 440px;
    display: flex;
`;

export const part4 = css`
    margin-top: 10px;
`;

export const part5 = css`
    width: 390px;
    height: 100%;
    margin-right:10px;

`;

export const CategoryImgBox = css`
    height: 200px;
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.4s ease-out; 
    cursor: pointer;
`;

export const CategoryImg = css`
    height: 100%; 
    width: 100%;
`;

export const box01 = css`
    width: 400px;
    height: 100%;
    margin-right:10px;
    display: flex;
    align-items: center;
    justify-content: center;    
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.4s ease-out; 
    cursor: pointer;

`;

export const LabelBox2 = css`
    transition: transform 0.4s ease-out; 


`;

export const LabelBox = css`
    transition: transform 0.4s ease-out; 

    &>label{
        height: 15px;
        color: #2f2f2f;
        font-size: 16px;
        font-weight: 700;
        margin-left: 15px;
        margin-bottom: 2px;
    }

    &:hover{
        opacity: 0.9;    
        transform: scale(0.9);
    }
    &:active {
        opacity: 1;    
    }
`;

export const box02 = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 315px;
    margin-bottom: 10px;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.4s ease-out; 
    
    &>label{
        display: flex;
        font-family: 'IBMPlexSansKR-Regular';
        padding-top: 10px;
        padding-left: 20px;
        height: 15px;
        font-size: 16px;
        font-weight: 700;
        margin-top: 10px;
    }
`;

export const BestChallenge = css`
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-top: 30px; 
    cursor: pointer;
    
    & div {
        padding-bottom: 20px;
        
        & b {
            padding-left: 5px;
            font-size: 15px;
        }
    }
`;

export const Content = css`
    padding: 15px;
    width: 97%;
    height: 130px;
    overflow: hidden;
    background: rgba(255, 255  , 255, 0.7); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    & p {
        font-family: 'IBMPlexSansKR-Regular';
        font-weight: normal;
        padding-left: 5px;
        font-size: 16px;
    }
`;

export const BestFeed = css`
    padding: 10px;
    font-size: 15px;
    cursor: pointer;
`;

export const SFeedBody = css`
    display: flex;
    height: 210px;
    background: rgba(255, 255, 255, 0.7); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 8px;

`;

export const smallFeedBody = css`
    display: flex;
    flex-direction: column;
    width:150px;
    &>a{
        display: flex;
        justify-content:end;
        font-size: 13px;
        height: 20px;
        width: 150px;
    }

`;


export const TimeBox = css`
    width: 150px;
    &>a{
        display: flex;
        justify-content:end;
        font-size: 13px;
        width: 200px;
        height: 20px;
    }

`;

export const FeedImg = css`
    width: 200px;
    height: 200px;
    border-radius: 10px;
`;

export const FeedContentBox = (imgExists) => css`
    border-radius: 10px;
    width: 100%;
    height: 10px;
    display: flex;
    flex-direction: column;
    white-space: normal;

    &>div{
        width: 100%;
        border-radius: 10px;
        height: 180px;
    }

    ${!imgExists && `img { display: none; }`}
`;

export const FeedContent = css`
    font-family: 'IBMPlexSansKR-Regular';
    font-weight: normal;
    padding-left: 5px;
    font-size: 15px;
    display: flex;
    word-wrap: break-word;
    white-space: pre-line; 

`;

export const modalOverlay = css`
    position: fixed;
    margin: 0 auto;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(200, 200, 200, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`;



export const modalContent = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border-radius: 15px;
    background: #eee;
    z-index: 1001;
`;

export const FeedHeader = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;

    &>div>div{
        display: flex;
        align-items: center;
    }
`;
export const userInfo = css`
    display: flex;
    align-items: center;
    gap: 5px;
    white-space: nowrap;
    font-size: 15px;
`;

export const ChInfo = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 15px;

    &>div{
        gap: 10px;
    }

    & p {
        white-space: nowrap;
    }
`;

export const InfoImg = css`
    width: 35px;
    height: 35px;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
`;

export const box03 = css`
    cursor: pointer;
    width: 300px;    
    height: 200px;
    display: flex;
    margin-right: 10px;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.4s ease-out; 
    cursor: pointer; 

    &>label{
        font-family: 'IBMPlexSansKR-Regular';
        margin: 15px;
        height: 15px;
        font-size: 16px;
        font-weight: 700;
    }    

    *::-webkit-scrollbar {
        width: 2px;
    }
    *::-webkit-scrollbar-thumb {
        opacity: 0;
    }
    &:hover {
        *::-webkit-scrollbar {
            width: 2px;
        }
        *::-webkit-scrollbar-thumb {
            background-color: #dbdbdb
        }
    }
`;

export const ListBox = css`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    padding: 10px 0px 0px 0px;
    overflow-y: auto;
    width: 90%;
    height: 150px;

    & li {
        cursor: pointer;
        margin-bottom: 10px;
        font-size: 14px;
        color: #555;

        &:hover {
            color: darkgray;
        }
    }
`;

export const box031 = css`
    cursor: pointer;
    width: 300px;    
    height: 200px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F7F4F0;
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.4s ease-out; 
    
    & b {
        margin-right: 5px;
    }
    
    &:hover{
        opacity: 0.9;    
        transform: scale(0.9);
        background: #F7F4F070; 

    }
    &:active {
        opacity: 1;   
        color: #fafafa;

    }

    cursor: pointer; 
`;

export const box04 = css`
    width: 900px;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.4s ease-out; 
    cursor: pointer;


    &:hover{
        opacity: 0.9;    
        transform: scale(0.9);
        background-color: #F7F4F0;

    }
    &:active {
        opacity: 1;    
    }
`;

export const MiniTitle = css`
    width: 90%;
    height: 50px;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 50px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 0px 20px;
    display: flex;
    align-items: center;

`;

export const MiniContent = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

`;

export const box05 = css`
    margin: 0px 10px;
    width: 700px;
    transition: transform 0.4s ease-out; 
    cursor: pointer;

    /* &:hover{
        opacity: 0.9;    
        transform: scale(0.9);
    }
    &:active {
        opacity: 1;    
    } */
`;
export const box06 = css`
    padding: 10px 20px 10px 20px;
    width: 710px;
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.4s ease-out; 
    cursor: pointer;

    & h4 {
        cursor: pointer;
        font-size: 14px;
        color: #555;

        &:hover {
            color: darkgray;
        }
    }

    /* &:hover{
        opacity: 0.9;    
        transform: scale(0.9);
    }
    &:active {
        opacity: 1;    
    } */
`;

export const Notice = css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & td {
        cursor: pointer;
        font-size: 14px;
        color: #555;

        &:hover {
            color: darkgray;
        }
    }
`;

export const NoticeTb = css`
    padding: 20px;
    width: 100%;
    background: rgba(255, 255, 255, 0.7); 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const noticeTitle = css`
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const LogoImg1 = css`
    background-image: url(${LogoImg});
    background-size: cover;
    width: 100%;
    height: 100%;
`;


export const IconBox = css`
    position: relative;

    &>div{
        width: 100px;
        height: 100px;
        font-size: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px;
    }
`;


