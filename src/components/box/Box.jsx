import React from "react";
import styled from "styled-components";

import Plus from "@/assets/icons/plus.png";
import { media } from "../../style/media";

export default function Box({ url }) {
  return (
    <>
      <Boxcontainer>
        <Divbox>
          {url && url ? (
            <BackgroundImg src={url} />
          ) : (
            <PlusImg>
              <img src={Plus} style={{ width: "20px", height: "20px" }} />
            </PlusImg>
          )}
        </Divbox>
      </Boxcontainer>
    </>
  );
}

//전체 컨테이너
const Boxcontainer = styled.div`
  display: flex;
  margin-right: 6px;
  ${media.mobile`
    width:70vw;
  `}
`;

// //Box 모양
const Divbox = styled.div`
  background-color: #d9d9d9;
  width: 228px;
  height: 295px;
  border-radius: 150px;
  display: flex;
  justify-content: center;
  overflow: hidden;
  margin: 0 auto;
  ${media.mobile`
    background-color: #d9d9d9;
    width: 182px;
    height: 181px;
    border-radius: 150px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    margin: 0 auto;
  `}
`;
const PlusImg = styled.div`
  display: flex;
  align-items: center;
`;

const BackgroundImg = styled.div`
  background: ${(props) => `url(${props.src}) no-repeat center`};
  width: 100%;
  height: 100%;
  background-size: cover;
`;
