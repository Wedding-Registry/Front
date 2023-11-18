import React from "react";
import styled from "styled-components";
import logo from "@/assets/icons/logo.png";

export default function BorderIdModal({ borderAddButton }) {
  return (
    <Cotainer>
      <TitleDiv>
        <Logo src={logo} />
        <WeddingText>Wedding Registry</WeddingText>
      </TitleDiv>
      <Wapper>
        <Button onClick={borderAddButton}>시작하기</Button>
      </Wapper>
    </Cotainer>
  );
}

const Cotainer = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(228, 230, 232, 0.5);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); /* 자식요소에 translate 값 주기*/
`;

const Wapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const TitleDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 50%;
`;

const Button = styled.button`
  width: 300px;
  height: 100px;
  border: none;
  box-shadow: 10px 5px 5px darkgray;
  &:hover {
    background-color: gray;
  }
`;

const Logo = styled.img`
  width: 76px;
  height: 54px;
  margin-bottom: 20px;
`;

const WeddingText = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
`;
