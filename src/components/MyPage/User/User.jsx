import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { instance } from '../../../api/config/instance';
import { useQuery } from 'react-query';
import BaseLayout from '../../BaseLayout/BaseLayout';
import * as S from './UserStyle';
import MypageDetailSideBar from '../../MypageDetailSideBar/MypageDetailSideBar';
import { CircularProgressBar } from '@tomickigrzegorz/react-circular-progress-bar';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

function User() {
    const navigate = useNavigate();
    const [ myChallenge, setMyChallenge ] = useState([]);
    const [ myEndChallenge, setMyEndChallenge ] = useState([]);
    const [ selectedChallenge, setSelectedChallenge ] = useState(null);
    const [ challengeProgress, setChallengeProgress ] = useState(0);
    const [ challengeStartDate, setChallengeStartDate ] = useState(null);
    const [ challengeEndDate, setChallengeEndDate ] = useState(null);
    const [ myFeedList, setMyFeedList ] = useState([]);
    const [ title, setTitle ] = useState("");
    const option = {
        headers: {
            Authorization: localStorage.getItem("accessToken")
        }
    }

    const getMyChallenges = useQuery(["getMyChallenges"], async () => {
        try {
            return await instance.get("/api/account/mychallenges", option);
        } catch(error) {
            throw new Error(error)
        }
        }, {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: response => {
            setMyChallenge(response.data);
        }
        });

    const getMyEndChallenges = useQuery(["getMyEndChallenges"], async () => {
        try {
        return await instance.get("/api/account/myendchallenges", option);
        } catch(error) {
            throw new Error(error)
        }
        }, {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: response => {
            setMyEndChallenge(response.data);
        }
    });

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleChallengeClick = async (challengeId, startDateTime, endDateTime, isHidden, isDeadline) => {
        try {
            const response = await instance.get(`/api/account/${challengeId}`, option);
            const progressValue = response.data;
            const challengeFeed = await instance.get(`/api/account/${challengeId}/feed`, option);
            const myChallengeFeeds = challengeFeed.data;
            const startDate = new Date(startDateTime);
            const endDate = new Date(endDateTime);
            const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
            const today = new Date();
            const daysElapsed = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));
            const my = daysElapsed - progressValue;
            const progress = ((100 / (totalDays+1)) * ((totalDays+1) - my))

            setChallengeStartDate(formatDate(startDate));
            setChallengeEndDate(formatDate(endDate));
            setSelectedChallenge(challengeId);
            setMyFeedList(myChallengeFeeds);

            if(progressValue === 0) {
                setChallengeProgress(0);
            }else {
                setChallengeProgress(parseInt(progress));
            }

            if (isHidden || isDeadline) {
                setTitle("종료");
            } else {
                setTitle("진행중");
            }
    
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <BaseLayout>
            <MypageDetailSideBar>
                <div css={S.Layout}>
                    <div css={S.LeftBox}>
                        <div css={S.ListLayout}>
                            <h2>참여중인 챌린지 List</h2>
                            <div css={S.ListBox}>
                                {myChallenge?.map((myChallenge, index) => (
                                    <li key={index} onClick={() => handleChallengeClick(myChallenge.challengeId, myChallenge.startDate, myChallenge.endDate, myChallenge.isDeadline, myChallenge.isHidden)}>
                                        {myChallenge.challengeName}
                                    </li>
                                ))}
                            </div>
                        </div>
                        <div css={S.EndListLayout}>
                            <h2>종료된 챌린지 List</h2>
                            <div css={S.ListBox}>
                                {myEndChallenge?.map((myChallenge, index) => (
                                    <li key={index} onClick={() => handleChallengeClick(myChallenge.challengeId, myChallenge.startDate, myChallenge.endDate, myChallenge.isDeadline, myChallenge.isHidden)}>
                                        {myChallenge.challengeName}
                                    </li>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div css={S.RightBox}>
                        <div css={S.TitleBox}>
                            <h2>{title}</h2>
                            <b>{challengeStartDate} ~ {challengeEndDate}</b>
                        </div>
                        <div css={S.ProgressBox}>
                            <CircularProgressBar colorCircle="#eee" colorSlice="pink" fontSize="10px" percent={parseFloat(challengeProgress)}/>
                        </div>

                        <div css={S.FeedListBox}>
                            {myFeedList.map(feed => (
                                <div key={feed.feedId} css={S.FeedBox}>

                                    <div css={S.FeedHeader}>
                                        <div css={S.userInfo}>
                                            <img css={S.InfoImg} src={feed.profileUrl} alt="" />
                                            <b>{feed.nickname}</b>  
                                        </div>
                                        <div  css={S.ChInfo}>
                                            <div onClick={() => {navigate("/challenge/" + feed.challengeId)}}>
                                                <p>[{feed.categoryName}]</p>
                                            </div>
                                            <div>
                                                {feed.stopWatch !== 0 ? (
                                                    <div>진행 시간 : {convertSecondsToTime(feed.stopWatch)}</div>
                                                ) : (null)}
                                            </div>
                                        </div>
                                    </div>

                                    <div css={S.SFeedBody}>
                                        {feed.img && <img css={S.FeedImg} src={feed.img} alt="" />}
                                        <div css={S.FeedContentBox(!!feed.img)} imgexists={(!!feed.img).toString()}>
                                            <a>{getTimeDifference(feed.dateTime)}</a>
                                            <div css={S.FeedContent}>{feed.feedContent}</div>
                                        </div>                                 
                                    </div>
                                    
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </MypageDetailSideBar>
        </BaseLayout>
    );
}

export default User;

function getTimeDifference(feedDateTime) {
    const currentDateTime = new Date();
    const feedDate = new Date(feedDateTime);

    const timeDifferenceInSeconds = Math.floor((currentDateTime - feedDate) / 1000);

    if (timeDifferenceInSeconds < 60) {
        return `${timeDifferenceInSeconds}초 전`;
    } else if (timeDifferenceInSeconds < 3600) {
        const minutes = Math.floor(timeDifferenceInSeconds / 60);
        return `${minutes}분 전`;
    } else if (timeDifferenceInSeconds < 86400) {
        const hours = Math.floor(timeDifferenceInSeconds / 3600);
        return `${hours}시간 전`;
    } else {
        const days = Math.floor(timeDifferenceInSeconds / 86400);
        return `${days}일 전`;
    }
}

function convertSecondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime = `${hours > 0 ? hours + '시간 ' : ''}${minutes > 0 ? minutes + '분 ' : ''}${remainingSeconds}초`;
    return formattedTime.trim();
}