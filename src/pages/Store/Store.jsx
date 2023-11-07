import React from 'react';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import { useQuery } from 'react-query';
import { instance } from '../../api/config/instance';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */

const SItemLayout = css`
    border: 1px solid #dbdbdb;
`;

const SItemImgLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #dbdbdb;
    padding: 10px;
`;

const SItemImgContainer = css`
    width: 200px;
    height: 200px;
`;

const itemImg = css`
    width: 100%;
    height: 100%;
`;

function Store(props) {
    const navigate = useNavigate();

    const getItems = useQuery(["getItems"], async () => {
        try{
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            }
            return await instance.get("/api/store/items", option);

        }catch(error) {
            throw new Error(error);

        }
        },
        {
            retry: 0,
            refetchInterval: 1000 * 60 * 10,
            refetchOnWindowFocus: false
        }
    );

    if(getItems.isLoading){
        return <></>
    }    

    return (
        <BaseLayout>
            <h1>상점 물품 조회</h1>
            {!getItems.isLoading &&
                getItems?.data?.data.map(item => {
                    return <div css={SItemLayout} key={item.itemId}>
                            <div css={SItemImgLayout}>
                                <div css={SItemImgContainer}>
                                    <img css={itemImg} src={item.itemImgUrl} alt="상품의 이미지" />
                                </div>
                            </div>
                            <div>상품명 : {item.itemName}</div>
                            <div>가격 : {item.itemPrice} point</div>
                            <button>구매 버튼(미구현)</button>
                        </div>
            })}
            <button onClick={() => { navigate("/") }}>메인으로</button>
        </BaseLayout>
    );
}

export default Store;