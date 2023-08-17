//상품 등록 페이지에서 링크 공유 클릭시 일어나는 component
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import kakaotalk from "@/assets/icons/kakaotalk.png";
import sharelink from "@/assets/icons/sharelink.png";
import { getGoodsUrlUUID } from "../services/uuid/UrlUuidService";

export default function ShareBox({ setSharebox }) {
  const [uuid, setUUID] = useState([]);

  async function getGoodsUrlUuidRender() {
    const UUID = await getGoodsUrlUUID();
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
    getGoodsUrlUuidRender();
    //kakao sdk script 부른 후 window.kakao로 접근
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
          title: "제목",
          description: "카카오 공유하기",
          imageUrl: kakaotalk, //local이나 내 ip는 사용할 수 없기 떄문에 test 불가 ,
          link: {
            webURL: `https://zolabayo.com/invitation/${uuid.uuidFirst}/${uuid.uuidSecond}`,
          },
        },
      });
    }
  };
  const urlLinkClick = () => {
    try {
      navigator.clipboard.writeText(
        `도메인주소/GallerySupport/${uuid.uuidFirst}/${uuid.uuidSecond}`
      );
      alert("링크주소가 복사되었습니다.");
      setSharebox(false);
    } catch (e) {
      console.error(e);
      alert("다시 시도해주세요.");
    }
  };
  return (
    <Shareboxdiv>
      <Shareboxp>
        <span
          onClick={() => shareKaKao}
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
