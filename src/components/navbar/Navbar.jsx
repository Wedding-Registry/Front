import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { AiOutlineShoppingCart } from "@react-icons/all-files/ai/AiOutlineShoppingCart";
import { AiOutlineFileSync } from "@react-icons/all-files/ai/AiOutlineFileSync";
import { AiOutlinePicture } from "@react-icons/all-files/ai/AiOutlinePicture";

import { MdKeyboardArrowRight } from "@react-icons/all-files/md/MdKeyboardArrowRight";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";

import wishlist from "../../assets/icons/wishlist.png";
import { getGoodsUrlUUID } from "../../services/uuid/UrlUuidService";
import useTokenDecode from "../../hooks/useTokenDecode";
import { removeAccessToken } from "../../repository/AuthTokenRepository";
import { getAlarm } from "../../services/navbar/NavbarService";
import {
  getUuidFristToken,
  getUuidSecoundToken,
  setUUidToken,
} from "../../repository/GuestUuidRespository";
import NotificationItem from "./notificationItem/Notificationitem";
import GuestNavbar from "./GuestNavbar";

function NotificationItemList({ notifications }) {
  if (notifications === undefined || notifications === null) {
    return <></>;
  }
  if (notifications.length === 0) {
    return <></>;
  }
  return notifications.map((value, index) => (
    <NotificationItem data={value} key={index} />
  ));
}

//로그인상태에따른 navbar click 행위 핸들링
//로그인이 되어 있지 않는 상태에서 navbar 클릭 시 return
function LoginStatusNavbar({ token, setNavbar }) {
  const navbarClose = () => {
    if (!token) {
      alert("로그인 정보가 올바르지 못합니다.");
      setNavbar(false);
      return;
    }
    setNavbar(false);
  };

  return (
    <TopItem>
      <TopTitleText>카테고리</TopTitleText>
      <LinkInput to={token ? "/GoodsProduct" : "/"} onClick={navbarClose}>
        <AiOutlineShoppingCart
          style={{ marginRight: "5px", marginLeft: "3px" }}
        />
        상품 리스트
        <MdKeyboardArrowRight style={{ marginLeft: "auto" }} />
      </LinkInput>
      <LinkInput to={token ? "/admin" : "/"} onClick={navbarClose}>
        <AiOutlineFileSync style={{ marginRight: "5px", marginLeft: "3px" }} />
        관리 페이지
        <MdKeyboardArrowRight style={{ marginLeft: "auto" }} />
      </LinkInput>
      <LinkInput to={token ? "/GalleryWedding" : "/"} onClick={navbarClose}>
        <AiOutlinePicture style={{ marginRight: "5px", marginLeft: "3px" }} />
        갤러리 페이지
        <MdKeyboardArrowRight style={{ marginLeft: "auto" }} />
      </LinkInput>
      <LinkInput to={token ? "/admin/memo" : "/"} onClick={navbarClose}>
        <img
          src={wishlist}
          style={{ width: "20px", height: "20px", marginLeft: "3px" }}
        />
        위시 리스트/메모장
        <MdKeyboardArrowRight style={{ marginLeft: "auto" }} />
      </LinkInput>
    </TopItem>
  );
}

export default function Navbar({ setNavbar, token, guestState }) {
  const [_, nickName] = useTokenDecode(token);
  const [navbarNotification, setNavbarNotification] = useState([]);
  const navigate = useNavigate();
  const handleNavbarState = () => setNavbar(false);

  const uuidFirst = getUuidFristToken();
  const uuidSecound = getUuidSecoundToken();

  async function getNavibarNotificationRender() {
    const navbarData = await getAlarm();
    setNavbarNotification(navbarData.data);
  }

  async function getGoodsUrlUuidRender() {
    const UUID = await getGoodsUrlUUID();
    if (!uuidFirst && token) {
      setUUidToken(UUID.data.uuidFirst, UUID.data.uuidSecond);
    }
  }
  console.log(_);

  function guestStateRender() {
    if (uuidFirst) {
      removeAccessToken();
      navigate(`/Guest/${uuidFirst}/${uuidSecound}`);
      setNavbar(false);
      alert("로그아웃");
      return;
    }
  }

  const handleLogoutButton = () => {
    guestStateRender();
    if (token) {
      removeAccessToken();
      navigate("/");
      setNavbar(false);
      alert("로그아웃");
      return;
    }
    if (!token) {
      navigate("/");
      setNavbar(false);
      alert("로그인정보가 존재하지 않습니다.");
      return;
    }
  };

  useEffect(() => {
    if (uuidFirst) {
      return;
    }
    if (!uuidFirst) {
      getGoodsUrlUuidRender();
    }
  }, []);

  useEffect(() => {
    if (token) getNavibarNotificationRender();
  }, []);

  const handleShareLink = async (first, secound) => {
    if (token) {
      await handleClipboard(first, secound);
    }
  };

  const handleClipboard = async (first, secound) => {
    try {
      await navigator.clipboard.writeText(
        `https://zolabayo.com/GallerySupport/${first}/${secound}`
      );
      setNavbar(false);
      alert("링크주소가 복사되었습니다.");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      {!guestState ? (
        <Base>
          <Title>ZOLABAYO</Title>
          <NickNamediv>
            <NickNameText>
              <BsFillPersonFill
                style={{ width: "25px", height: "27px", marginRight: "5px" }}
              />
              {nickName ? (
                <span>{nickName}님을 환영합니다.</span>
              ) : (
                <Link
                  to="/signin"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    border: "none",
                  }}
                  onClick={handleNavbarState}
                >
                  <span>로그인을 진행해주세요.</span>
                </Link>
              )}
            </NickNameText>
          </NickNamediv>
          <LoginStatusNavbar token={token} setNavbar={setNavbar} />
          <CenterItemDiv>
            <div>
              <CenterItemTitle>알림 목록</CenterItemTitle>
            </div>
            <NotificationItemList
              notifications={navbarNotification}
              setNavbar={setNavbar}
            />
          </CenterItemDiv>
          <BottomItemDiv>
            <span
              style={{ fontSize: "13px" }}
              onClick={() => handleShareLink(uuidFirst, uuidSecound)}
            >
              링크 공유하기
            </span>
            {token ? (
              <LogButton onClick={handleLogoutButton}>Log out</LogButton>
            ) : (
              <Link to="/signin" onClick={handleNavbarState}>
                <LogButton>Login</LogButton>
              </Link>
            )}
          </BottomItemDiv>
        </Base>
      ) : (
        <GuestNavbar
          nickName={nickName}
          handleLogoutButton={handleLogoutButton}
          setNavbar={setNavbar}
          uuidFirst={uuidFirst}
          uuidSecound={uuidSecound}
        />
      )}
    </>
  );
}

const Base = styled.div`
  display: flex;
  flex-direction: column;
  height: 800px;
  width: 250px;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px;
  z-index: 100;
  right: 3%;
  position: absolute;
  background: #eaeaeb;
`;

const Title = styled.p`
  text-align: center;
  margin-top: 7px;
`;

const NickNamediv = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  padding: 5px;
  margin-top: 10px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 36px;
  display: flex;
  align-items: center;
  margin-right: 10px;
  width: 97%;
`;

const NickNameText = styled.p`
  display: flex;
  align-items: center;
  margin-left: 2px;
`;

const TopTitleText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 36px;
  margin-top: 10px;
  color: #1e3f81;
  margin-left: 5px;
`;

const TopItem = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  padding: 5px;
  height: 210px;
`;

const CenterItemDiv = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  height: 500px;
`;
const CenterItemTitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 36px;
  margin-bottom: 5px;
  color: #1e3f81;
  margin-left: 5px;
`;

const BottomItemDiv = styled.div`
  display: flex;
  justify-content: space-around;
  height: 30px;
  align-items: center;
`;

const LinkInput = styled(Link)`
  text-decoration: none;
  width: 100%;
  color: black;
  height: 20px;
  margin-top: 15px;
  border-radius: 20px;
  border: none;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  position: relative;

  &:hover {
    text-decoration: underline;
    text-decoration-color: #b5acac;
  }
`;

const LogButton = styled.button`
  border: none;
  background-color: transparent;
`;
