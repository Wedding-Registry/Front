import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import CircleRadius from "@/assets/icons/radius.png";
import FirstAnimation from "@/assets/icons/first.png";
import SecoundAnimation from "@/assets/icons/secound.png";
import ThreeAnimation from "@/assets/icons/three.png";
import { getAccessToken } from '../../tokens/token';
import BorderIdModal from '../../components/borderid/BorderIdModal';

const Base = styled.div`
  display: flex;
  justify-content: center;
  height: 92.8vh;
  align-items: center;
  margin-left: 10%;
  position: relative;
`;

const Centerdiv = styled.div`
  width: 339px;
  height: 508px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000000;
  border-radius: 230px;
`;

const ZolabayoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 80%;
  position: relative;
`;

const ZolabayoText = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  text-align: right;
`;

const ZolabayoMemoText = styled.p`
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.8);
  text-align: right;
  margin-top: 1rem;
`;

const Weddingdiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 50%;
  margin-left: 1rem;
`;

const WeddingText = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
`;
const WeddingMemoText = styled.p`
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 1rem;
`;

const ImgDiv = styled.div`
  height: 80%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  position: absolute;
  top: 15%;
  left: 70%;
`;

const AniMove = keyframes`
  0%{
    background-image: url(${FirstAnimation});
    background-size: cover;
    width: 400px;
    height: 400px;
    display: flex;
    justify-content: center;

  }
  25%{
    background-image: url(${SecoundAnimation});
    background-size: cover;
    width: 400px;
    height: 400px;
    display: flex;
    justify-content: center;

  }
  50%{
    background-image: url(${ThreeAnimation});
    background-size: cover;
    width: 400px;
    height: 400px;
    display: flex;
    justify-content: center;

  }
  100%{
    background-image: url(${FirstAnimation});
    background-size: cover;
    width: 400px;
    height: 400px;
    display: flex;
    justify-content: center;

  }
`;

const MainImage = styled.div`
  filter: drop-shadow(0px 20px 5px rgba(85, 91, 102, 0.3));
  background: url(${FirstAnimation});
  width: 400px;
  height: 400px;
  background-size: cover;
  background-position: center;
  &:hover {
    animation: ${AniMove} 1s steps(4, end) infinite;
  }
`;


export default function MainContainer({token}) {
  const [bordorIdModal,setBorderIdModal] = useState(true);
  console.log(bordorIdModal);
  useEffect(()=>{
    getAccessToken();
    // const token = getAccessToken();    
    // if(token !== null){      
    //   setBorderIdModal(false);
    // }
  },[])
  
  return (
    <>
      <Base>
        <ZolabayoDiv>
          <ZolabayoText>ZOLABAYO</ZolabayoText>
          <ZolabayoMemoText>
            ZOLABAYO의 Wedding Registry 서비스로
            <br />
            새로운 인생을 시작하는 신혼부부에게
            <br />
            축복을 선물 해보세요.
          </ZolabayoMemoText>
          <ImgDiv>
            <img
              src={CircleRadius}
              style={{
                width: "300px",
                height: "300px",
              }}
            />
          </ImgDiv>
        </ZolabayoDiv>
        <Centerdiv>
          <MainImage />
        </Centerdiv>
        <Weddingdiv>
          <WeddingText>Wedding Registry</WeddingText>
          <WeddingMemoText>
            축의금 대신 결혼선물로 신혼부부를 축하하는 서비스입니다. <br />
            신혼부부가 원하는 선물을 직접 축하의미를 담아 선물 할 수 있습니다.
          </WeddingMemoText>
        </Weddingdiv>
      </Base>
      {bordorIdModal ? <BorderIdModal setBorderIdModal={setBorderIdModal} token={token}/> : <></>}
    </>
  );
}
