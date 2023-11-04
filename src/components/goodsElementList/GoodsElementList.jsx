import React from "react";
import styled from "styled-components";

import Box from "@/components/box/Box";
import { media } from "../../style/media";

const GoodsElementList = ({ FIX_SIZE, arrayLength, setIsOpen }) => {
  let element = [];
  function alertHandler() {
    alert("후원 페이지에서는 상품을 등록할 수 없습니다.");
  }
  for (let i = 0; i < FIX_SIZE - arrayLength; i++) {
    element.push(
      <BoxItem
        onClick={() =>
          setIsOpen === undefined
            ? alertHandler()
            : setIsOpen({ result: true, state: "Edit", userGoodsId: "" })
        }
        key={i}
      >
        <Box />
        <ItemDiv />
      </BoxItem>
    );
  }
  return element;
};

export default GoodsElementList;

const BoxItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &:nth-child(odd) {
    margin-top: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 150px;
  }
  &:nth-child(even) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 150px;
    margin-right: 150px;
  }

  ${media.mobile`      
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &:nth-child(odd) {
    margin-top: auto;
    display: flex;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 67px;
  }
  &:nth-child(even) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 150px;
    margin-right: 105px;
  }
        
  `}
`;

const ItemDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
