import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { getGoodsSupportItemsList } from "../../services/gustGoods/GuestGoodsProductSerivce";
import MobileGuestGoods from "../../components/mobile/goods/MobileGuestGoods";
import {
  Mobile,
  PC,
} from "../../components/media/responsivePoint/ResPonsiveWeddingBreak";
import GoodsImgSlider from "../../components/goodsimgslider/GoodsImgSlider";
import MarriedInforMation from "../../components/married/MarriedInformation";

export default function GoodsSupportContainer({ guestToken }) {
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
      <PC>
        <GoodsContainer>
          <MarriedInforMation guestToken={guestToken} />
          <GoodsImgSlider
            goodsSupportData={goodsSupportData}
            guestToken={guestToken}
            setGoodsSupportData={setGoodsSupportData}
            getGoodsListRender={getGoodsListRender}
          />
        </GoodsContainer>
      </PC>
      <Mobile>
        <MobileGuestGoods guestToken={guestToken} />
      </Mobile>
    </>
  );
}

const GoodsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
