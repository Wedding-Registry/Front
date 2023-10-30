import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import Box from "@/components/box/Box";

import { RiArrowDropLeftLine } from "@react-icons/all-files/ri/RiArrowDropLeftLine";
import { RiArrowDropRightLine } from "@react-icons/all-files/ri/RiArrowDropRightLine";

import GoodsSupportModal from "../../components/goodssupportmodal/GoodsSupportModal";

import GoodsElementList from "../../components/goodsElementList/GoodsElementList";
import { media } from "../../style/media";

export default function GoodsImgSlider({
  goodsSupportData,
  guestToken,
  setGoodsSupportData,
  getGoodsListRender,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [usersGoodsId, setUsersGoodsId] = useState("");
  const slideRef = useRef(null);
  const TOTAL_SLIDES = 1;
  const arrayLength = goodsSupportData ? goodsSupportData.length : 0;
  const FIX_SIZE = 10;

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  return (
    <BoxContainer>
      <RiArrowDropLeftLine onClick={prevSlide} size="40" />
      <BoxSlider>
        <BoxWapper ref={slideRef}>
          {goodsSupportData &&
            goodsSupportData.map((value) => (
              <BoxItem
                key={value.id}
                onClick={() => {
                  setIsOpen(true);
                  setUsersGoodsId(value.usersGoodsId);
                }}
              >
                <Box url={value.usersGoodsImgUrl} />
                <ItemDiv>
                  <StyledTrack>
                    <StyledRange width={value?.usersGoodsPercent} />
                  </StyledTrack>
                  <ValueItem>
                    <p>{value?.usersGoodsName}</p>
                    <p>{value?.usersGoodsPrice}원</p>
                    <p>{value?.usersGoodsTotalDonation}원 후원</p>
                  </ValueItem>
                </ItemDiv>
              </BoxItem>
            ))}
          <GoodsElementList FIX_SIZE={FIX_SIZE} arrayLength={arrayLength} />
        </BoxWapper>
      </BoxSlider>
      {isOpen && (
        <GoodsSupportModal
          setIsOpen={setIsOpen}
          goodsSupportData={goodsSupportData}
          usersGoodsId={usersGoodsId}
          guestToken={guestToken}
          setGoodsSupportData={setGoodsSupportData}
          getGoodsListRender={getGoodsListRender}
        />
      )}
      <RiArrowDropRightLine onClick={nextSlide} size="40" />
    </BoxContainer>
  );
}

const BoxWapper = styled.div`
  display: flex;
  height: 50vh;
  margin-top: 20px;
  width: 100%;
  ${media.mobile`
    display: flex;
    height: 60vh;
    margin-top: 20px;
    width: 100%;
  `}
`;

const BoxContainer = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;
  ${media.mobile`
    display: flex;        
    justify-content: center;
    align-items: center;
    
  `}
`;

const BoxItem = styled.div`
  display: flex;
  &:nth-child(odd) {
    margin-top: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &:nth-child(even) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 150px;
  }
`;

const ItemDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledTrack = styled.div`
  width: 5px;
  height: 100px;
  background-color: #ebebeb;
  border-radius: 15px;
  transform: rotate(180deg);
  margin-right: 10px;
`;

const StyledRange = styled.div`
  display: flex;
  width: 100%;
  height: ${({ width }) => (width > 100 ? "100%" : `${width}%`)};
  background: linear-gradient(to right, blue, blue);
`;

const ValueItem = styled.div`
  width: 116.5px;
  display: inline-block;
  font-style: normal;
  font-weight: 400px;
  font-size: 14px;
  line-height: 17px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const BoxSlider = styled.div`
  width: 100%;
  height: 50%;
  overflow-x: hidden;
  margin-bottom: 10%;
  ${media.mobile`
    width:100%;
    height:50%;
    
  `}
`;
