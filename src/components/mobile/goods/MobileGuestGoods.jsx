import React, { useEffect, useState } from "react";
//공유 이미지 가져오기
import styled from "styled-components";

import { getGoodsSupportItemsList } from "../../../services/gustGoods/GuestGoodsProductSerivce";

import MarriedInforMation from "../../married/MarriedInformation";
import GoodsImgSlider from "../../goodsimgslider/GoodsImgSlider";

export default function MobileGuestGoods({ guestToken }) {
  const [goodsSupportData, setGoodsSupportData] = useState([]);
  const [didMount, setDidMount] = useState(false);

  // 상품 조회
  async function getGoodsListRender(guestToken) {
    const goodsSupportData = await getGoodsSupportItemsList(guestToken);
    setGoodsSupportData(goodsSupportData.data);
  }

  //Api 2번 호출 막기
  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      getGoodsListRender(guestToken);
    }
  }, [didMount]);

  return (
    <>
      <GoodsContainer>
        <MarriedInforMation guestToken={guestToken} />
        <GoodsImgSlider
          goodsSupportData={goodsSupportData}
          guestToken={guestToken}
          setGoodsSupportData={setGoodsSupportData}
          getGoodsListRender={getGoodsListRender}
        />
      </GoodsContainer>
    </>
  );
}

const GoodsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
