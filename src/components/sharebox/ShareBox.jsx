//상품 등록 페이지에서 링크 공유 클릭시 일어나는 component
import React, { useEffect } from "react";
import styled from "styled-components";
import kakaotalk from "@/assets/icons/kakaotalk.png";
import sharelink from "@/assets/icons/sharelink.png";
import { getGoodsUrlUUID } from "../../services/uuid/UrlUuidService";

import {
  getUUid1Token,
  getUUid2Token,
  setUUidToken,
} from "../../repository/GuestUuidRespository";
import { shareKaKaoLink } from "../../util/shareKaKaoLink";
import { useRecoilValue } from "recoil";
import { marriedInformationState } from "../../state/marriedInformationState";

export default function ShareBox({ setSharebox }) {
  const marriedInformationData = useRecoilValue(marriedInformationState);
  const HUSBAND_NAME = marriedInformationData.data?.account[0].name;
  const WIFE_NAME = marriedInformationData.data?.account[1].name;
  const localUuid1 = getUUid1Token();
  const localUuid2 = getUUid2Token();
  async function getGoodsUrlUuidRender() {
    const UUID = await getGoodsUrlUUID();

    if (!localUuid1) {
      setUUidToken(UUID.data.uuidFirst, UUID.data.uuidSecond);
    }
  }

  useEffect(() => {
    if (!localUuid1) {
      getGoodsUrlUuidRender();
    }
  }, []);

  useEffect(() => {
    //카카오톡 sdk 추가
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  async function urlLinkClick() {
    try {
      await navigator.clipboard.writeText(
        `https://zolabayo.com/GallerySupport/${localUuid1}/${localUuid2}`
      );
      setSharebox(false);
      alert("링크주소가 복사되었습니다.");
    } catch (e) {
      console.error(e);
      alert("다시 시도해주세요.");
    }
  }

  return (
    <Shareboxdiv>
      <Shareboxp>
        <span
          onClick={() =>
            shareKaKaoLink(HUSBAND_NAME, WIFE_NAME, localUuid1, localUuid2)
          }
          style={{ marginRight: "12px", display: "flex", alignItems: "center" }}
        >
          <img src={kakaotalk} style={{ marginRight: "3px" }} />
          카카오톡 공유하기
        </span>
        <span>|</span>
        <span
          style={{
            display: "flex",
            width: "130px",
          }}
          onClick={urlLinkClick}
        >
          <img
            src={sharelink}
            style={{
              marginLeft: "10px",
              marginRight: "3px",
            }}
          />
          링크 복사하기
        </span>
      </Shareboxp>
    </Shareboxdiv>
  );
}

const Shareboxdiv = styled.div`
  background-color: #ebebeb;
  width: 300px;
  display: flex;
  justify-content: center;
  border-radius: 15px;
  font-size: 14px;
  float: right;
  height: 3rem;
  align-items: center;
`;

const Shareboxp = styled.p`
  display: flex;
  text-align: center;
`;
