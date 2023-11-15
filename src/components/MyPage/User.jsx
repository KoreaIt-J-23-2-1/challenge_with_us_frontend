import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import { instance } from '../../api/config/instance';
import { useQuery, useQueryClient } from 'react-query';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import Store from '../../components/Store/Store';
import * as S from './UserStyle';

function User() {
    const navigete = useNavigate();
    const [ isModalOpen, setModalOpen ] = useState(false);
    const [ isStoreModalOpen, setIsStoreModalOpen ] = useState(false);
    const [ password, setPassword ] = useState();
    const [ myChallenge, setMyChallenge ] = useState();
    const [ intro, setIntro ] = useState("");
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState.data.data;

    const getMyChallenges = useQuery(["getMyChallenges"], async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            }
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

    if(getMyChallenges.isLoading) {
        return <></>
    };

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };
    
    const toggleStoreModal = () => {
        
        navigete("/store/items")
        // setIsStoreModalOpen(!isStoreModalOpen);
    };

    const closeModal = () => {
        setModalOpen(false);
        setIsStoreModalOpen(false);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleIntroChange = (e) => {
        setIntro(e.target.value);
    };

    const handleSubmit = () => {
        navigete("/account/mypage/detail")
    };

    const handleCancelClick = () => {
        closeModal();
    };

    const handleStoreCancelClick = () => {
        closeModal();
    };

    const handleIntroSubmit = () => {
        const option = {
            params: {
            nickname: principal.nickname,
            intro: intro,
            },
        };
        instance.get('/api/account/intro', option)
            .then((response) => {
            queyrClient.refetchQueries(["getPrincipal"]);
            const introData = response.data.intro;
            const requestConfig = {
                nickname: principal.nickname,
                intro: intro,
            };
            const requestMethod = introData !== null ? 'put' : 'post';

            instance[requestMethod]('/api/account/intro', requestConfig);
            })
            .catch((error) => {
            });
    };

    console.log(principal)

    return (
        <div css={S.Layout}>
            <div css={S.UserBox}>
                <div css={S.ImgBox}>
                    <img src={principal.profileUrl} alt="" />
                </div>
                <div css={S.ProfileBox}>
                    <div css={S.ProfileText}>등급: 
                        <p>{principal.membership}</p>
                    </div>
                    <div css={S.ProfileText}>포인트: 
                        <p>{principal.point}</p>
                        point
                    </div>
                    <div css={S.ProfileText}>닉네임: 
                        <p>
                            {principal.nickname}
                        </p>
                    </div>
                </div>
                <div css={S.IntroBox}>
                    <h4>자기 소개</h4>
                    <textarea id="introText" rows="3" cols="40" maxLength={50} defaultValue={principal.intro} onChange={handleIntroChange}></textarea>
                    <div>
                        <button onClick={handleIntroSubmit}>저장</button>
                        <button>취소</button>
                    </div>
                </div>
            </div>
            <div>
                <p>참여중인 챌린지 List</p>
                <ul>
                    {getMyChallenges.data.data.map((myChallenge, index) => (
                        <li key={index}>{myChallenge.challengeName}</li>
                    ))}
                </ul>
            </div>
            <div css={S.BtBox}>
                <button onClick={toggleStoreModal}>상점</button>
                <button onClick={toggleModal}>정보변경</button>
            </div>
            <div css={S.modalStyle}>
                {isModalOpen && (
                    <div css={S.UserCheckBox}>
                        <h4>본인 확인</h4>
                        <input type="password" placeholder="비밀번호" onChange={handlePasswordChange} />
                        <div>
                            <button onClick={handleSubmit}>확인</button>
                            <button onClick={handleCancelClick}>취소</button>
                        </div>
                    </div>
                )}
                {isStoreModalOpen && (
                    <div css={S.UserCheckBox}>
                        <div>
                            <button onClick={() => {navigete("/point");}}>포인트충전</button>
                            <button onClick={handleStoreCancelClick}>취소</button>
                        </div>
                        <div css={S.SStore}>
                            <Store/>
                        </div>
                    </div>
                )}
            </div>
            </div>
    );
}

export default User;