//상품 등록 페이지에서 링크 공유 클릭시 일어나는 component
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import kakaotalk from "@/assets/icons/kakaotalk.png";
import sharelink from "@/assets/icons/sharelink.png";
import { getGoodsUrlUUID } from "../services/uuid/UrlUuidService";
import { uuidState } from "../state/uuidState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { marriedInformationState } from "../state/marriedInformationState";

export default function ShareBox({ setSharebox }) {
  const [uuid, setUUID] = useState({ uuidFirst: "", uuidSecond: "" });
  const setUuidState = useSetRecoilState(uuidState);
  const marriedInformationData = useRecoilValue(marriedInformationState);
  async function getGoodsUrlUuidRender() {
    const UUID = await getGoodsUrlUUID();
    setUuidState({
      uuidFirst: UUID.data.uuidFirst,
      uuidSecond: UUID.data.uuidSecond,
    });
    setUUID(UUID.data);
  }

  useEffect(() => {
    //카카오톡 sdk 추가
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  useEffect(() => {
    getGoodsUrlUuidRender();
  }, []);

  const shareKaKao = () => {
    //kakao sdk script 부른 후 window.kakao로 접근
    const INITIAL_LINK = `https://zolabayo.com/GallerySupport/${uuid.uuidFirst}/${uuid.uuidSecond}`;
    const HUSBAND_NAME = marriedInformationData.data.account[0].name;
    const WIFE_NAME = marriedInformationData.data.account[1].name;
    if (window.Kakao) {
      const kakao = window.Kakao;
      //중복 initalization 방지
      // 카카오에서 제공하는 javascirpt key를 이용하여  initiallze
      if (!kakao.isInitialized()) {
        //자바스크립트 키
        kakao.init("0140d2f1cdb4b1f0e243294bdeb84e57");
      }
      kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "ZOLABAYO",
          description: `${HUSBAND_NAME} ❤ ${WIFE_NAME}`,
          imageUrl:
            "https://www.urbanbrush.net/web/wp-content/uploads/edd/2022/09/urbanbrush-20220922134835594912.jpg", //local이나 내 ip는 사용할 수 없기 떄문에 test 불가 ,
          imageWidth: 1200,
          imageHeight: 630,
          link: {
            webUrl: INITIAL_LINK,
          },
        },
        buttons: [
          {
            title: "웹으로 보기",
            link: {
              webUrl: INITIAL_LINK,
            },
          },
        ],
      });
    }
  };
  const urlLinkClick = () => {
    try {
      navigator.clipboard.writeText(
        `https://zolabayo.com/GallerySupport/${uuid.uuidFirst}/${uuid.uuidSecond}`
      );
      setSharebox(false);
      alert("링크주소가 복사되었습니다.");
    } catch (e) {
      console.error(e);
      alert("다시 시도해주세요.");
    }
  };
  return (
    <Shareboxdiv>
      <Shareboxp>
        <span
          onClick={shareKaKao}
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
