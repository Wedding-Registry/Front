import React from "react";
import styled from "styled-components";

import Box from "@/components/box/Box";

const GoodsElementList = ({ FIX_SIZE, arrayLength, setIsOpen }) => {
  let element = [];
  function alertHandler() {
    alert("후원 페이지에서는 상품을 등록할 수 없습니다.");
  }
  for (let i = 0; i < FIX_SIZE - arrayLength; i++) {
    element.push(
      <BoxItem
        style={{ width: "100%", marginRight: "150px" }}
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
