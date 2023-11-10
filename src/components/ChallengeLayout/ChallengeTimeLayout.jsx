import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { instance } from '../../api/config/instance';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
`;

const TitleLayout = css`
    position: absolute;
    top: 0px;
    left: 50px;

    & b {
        margin: 0px 10px;
    }
`;

const TimeLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    width: 600px;
    height: 200px;
    font-size: 100px;
    border: 1px solid black;
    border-radius: 10px;
    letter-spacing: 10px;
    text-align: center;
`;

const ButtonLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;

    & button {
        width: 200px;
        height: 30px;
        background-color: transparent;
        border-radius: 5px;
    }
`;

const textLayout = css`
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
`;

const textareaBox = css`
    resize: none;
`;

const imagePreview = css`
    margin-left: 50px;
    max-width: 100%;
    max-height: 200px;
    border-radius: 10px;
`;

const FileBox = css`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
`;

const SaveButton = css`
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

function ChallengeTimeLayout() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const { challengeId } = useParams();
    const [ challenge, setChallenge ] = useState({});
    const [ selectedImage, setSelectedImage ] = useState(null);
    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    };

    const getChallenge = useQuery(["getChallenge"], async () => {
            try {
                return await instance.get(`/api/challenge/${challengeId}`, option);
            } catch (error) {
                throw new Error('챌린지 데이터를 가져올 수 없습니다.');
            }
        }, {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setChallenge(response.data);
            }
    });

    useEffect(() => {
        let timerInterval;

        if (isRunning) {
            timerInterval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => {
            clearInterval(timerInterval);
        };
    }, [isRunning]);

    if(getChallenge.isLoading) {
        return <></>
    }

    const startTimer = () => {
        setIsRunning(true);
    };

    const stopTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setTime(0);
        setIsRunning(false);
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const formattedTime = formatTime(time);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const blobUrl = URL.createObjectURL(file);
        setSelectedImage(blobUrl);
    };

    console.log(challenge)
    
    const handleSave = async () => {
        const data = {
            time: time,
            text: document.getElementById('challengeText').value,
            image: selectedImage,
            categoryName: challenge.categoryName,
            challengeLayout: challenge.layout,
            layout: 2
        }
        try {
            const response = await instance.post(`/api/challenge/feed/${challengeId}`, data, {
                headers: {
                    Authorization: localStorage.getItem('accessToken')
                },
            });

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div css={Layout}>
            <div css={TitleLayout}>
                {challenge ? (
                    <h1>Title: <b>{challenge.challengeName}</b>[{challenge.categoryName}]</h1>
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
            <div css={TimeLayout}>{formattedTime}</div>
            <div css={ButtonLayout}>
                <button onClick={startTimer} disabled={isRunning}>Start</button>
                <button onClick={stopTimer} disabled={!isRunning}>Stop</button>
                <button onClick={resetTimer}>Reset</button>
            </div>
            <div css={textLayout}>
                <div>
                    <textarea css={textareaBox} id="challengeText" rows="12" cols="70" maxLength={1000}></textarea>
                    <input css={FileBox} type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                {selectedImage && (
                    <img src={selectedImage} css={imagePreview} alt="Selected" />
                )}
            </div>
            <button css={SaveButton} onClick={handleSave}>인증하기</button>
        </div>
    );
}

export default ChallengeTimeLayout;
