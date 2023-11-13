import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
import ReactSelect from 'react-select';
import { useQuery } from 'react-query';
import { instance } from '../../api/config/instance';
/** @jsxImportSource @emotion/react */



const searchContainer = css`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    width: 100%;
    
    & > * {
        margin-left: 5px;
    }
`;

const selectBox = css`
    width: 100px;
`;

const SChallengeTitle = css`
    max-width: 500px;
    width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const SChallengeList = css`
    width: 100%;
    border: 1px solid #dbdbdb;
`;

const SChallengeListHeader = css`
    overflow-y: auto;

    & > li {
        display: flex;
        & > div {
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #dbdbdb;
            height: 50px;
        }
        & > div:nth-of-type(1) {width: 7%;}
        & > div:nth-of-type(2) {width: 53%;}
        & > div:nth-of-type(3) {width: 15%;}
        & > div:nth-of-type(4) {width: 20%;}
        & > div:nth-of-type(5) {width: 5%;}
    }
`;

const SChallengeListBody = css`
    height: 300px;
    overflow-y: auto;

    & > li {
        display: flex;
        cursor: pointer;
        & > div {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
            border: 1px solid #dbdbdb;
        }
        & > div:nth-of-type(1) {width: 7%;}
        & > div:nth-of-type(2) {
            width: 53%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        & > div:nth-of-type(3) {width: 15%;}
        & > div:nth-of-type(4) {width: 20%;}
        & > div:nth-of-type(5) {width: 5%;}
    }
`;

const SPageNumbers = css`
    display: flex;
    align-items: center;
    margin-top: 10px;
    width: 200px;

    & button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px 3px;
        width: 20px;
        border: 1px solid #dbdbdb;
        cursor: pointer;
    }

`;




function ChallengeList(props) {

    const navigate = useNavigate();
    const [ page, setPage ] = useState(1);
    const lastChallengeRef = useRef();
    const [ isChallengeListRefetch, setIsChallengeListRefetch ] = useState(false);
    const [ challengeList, setChallengeList ] = useState([]);

    const options = [
        {value: "전체", label: "전체"},
        {value: "챌린지제목", label: "챌린지제목"},
        {value: "카테고리이름", label: "카테고리이름"}
    ];

    const search = {
        optionName: options[0].label,
        searchValue: ""
    }

    const [ searchParams, setSearchParams ] = useState(search);

    const getChallengeList = useQuery(["getChallengeList", page], async () => {
        const option = {
            params: searchParams
        }
        return await instance.get(`/api/challenges/${page}`, option);
    }, {
        refetchOnWindowFocus: false,
        enabled: isChallengeListRefetch,
        onSuccess: (response) => {
            setChallengeList([...challengeList].concat(response.data));
            setIsChallengeListRefetch(false);
            setPage(page + 1);
        }
    });

    const getChallengeCount = useQuery(["getChallengeCount", page], async () => {
        const option = {
            params: searchParams
        }
        return await instance.get("/api/challenges/count", option);
    }, {
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        const observerService = (entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    setIsChallengeListRefetch(true);
                }
            });
        }

        const observer = new IntersectionObserver(observerService, {threshold: 1});
        observer.observe(lastChallengeRef.current);
    }, []);

    const handleSearchInputChange = (e) => {
        setSearchParams({
            ...searchParams,
            searchValue: e.target.value
        })
    }

    const handleSearchOptionSelect = (option) => {
        setSearchParams({
            ...searchParams,
            optionName: option.label
        })
    }

    const handleSearchButtonClick = () => {
        navigate("/challenges/1");
        getChallengeList.refetch();
    }

    // const pagination = () => {

    //     if(getChallengeCount.isLoading) {
    //         return <></>
    //     }

    //     const totalChallengeCount = getChallengeCount.data.data;

    //     const lastPage = totalChallengeCount % 10 === 0
    //         ?   totalChallengeCount / 10
    //         :   Math.floor(totalChallengeCount / 10) + 1
    
    //     const startIndex = parseInt(page) % 5 === 0 ? parseInt(page) - 4 : parseInt(page) - (parseInt(page) % 5) + 1;
    //     const endIndex = startIndex + 4 <= lastPage ? startIndex + 4 : lastPage;
    
    //     const pageNumbers = [];
    
    //     for (let i = startIndex; i <= endIndex; i++) {
    //         pageNumbers.push(i);
    //     }

        
    
    //     return (
    //         <>
    //             <button disabled={parseInt(page) === 1} onClick={() => {
    //                 navigate(`/challenges/${parseInt(page) - 1}`);
    //             }}>&#60;</button>
    
    //             {pageNumbers.map(num => {
    //                 return <button key={num} onClick={() => {
    //                     navigate(`/challenges/${num}`);
    //                 }}>{num}</button>;
    //             })}
    
    //             <button disabled={parseInt(page) === lastPage} onClick={() => {
    //                 navigate(`/challenges/${parseInt(page) + 1}`);
    //             }}>&#62;</button>
    //         </>
    //     );
    // };

    // console.log(challengeList)
    

    return (
        <div>
            <div css={searchContainer}>
                <div css={selectBox}>
                    <ReactSelect options={options} defaultValue={options[0]} onChange={handleSearchOptionSelect} />
                </div>
                <input type="text" onChange={handleSearchInputChange} />
                <button onClick={handleSearchButtonClick}>검색</button>
            </div>
            <ul css={SChallengeList}>
                <div css={SChallengeListHeader}>
                    <li>
                        <div>번호</div>
                        <div>챌린지제목</div>
                        <div>카테고리이름</div>
                        <div>시작일</div>
                        <div>좋아요 수</div>
                    </li>
                </div>
                <div css={SChallengeListBody}>
                    {challengeList.map(challenge => {
                        return (<li key={challenge.challengeId} 
                                onClick={() => {navigate(`/challenge/${challenge.challengeId}`)}}>
                                    <div>{challenge.challengeId}</div>
                                    <div>{challenge.title}</div>
                                    <div>{challenge.categoryname}</div>
                                    <div>{challenge.startDate}</div>
                                    <div>{challenge.likeCount}</div>
                                </li>);
                    })}
                    <li ref={lastChallengeRef}></li>
                </div>
            </ul>

            {/* <div css={SPageNumbers}>
                {pagination()}
            </div> */}
        </div>
    );
}

export default ChallengeList;