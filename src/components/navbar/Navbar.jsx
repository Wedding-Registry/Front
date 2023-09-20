import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  AiOutlineShoppingCart,
  AiOutlineFileSync,
  AiOutlinePicture,
} from "react-icons/ai";
import {
  BsCalendar2Heart,
  BsPersonGear,
  BsFillEnvelopeFill,
} from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiMoneyBill } from "react-icons/ci";

import { getGoodsUrlUUID } from "../../services/uuid/UrlUuidService";
import useTokenDecode from "../../hooks/useTokenDecode";
import { removeAccessToken } from "../../repository/AuthTokenRepository";
import { getAlarm } from "../../services/navbar/NavbarService";
import { useRecoilValue } from "recoil";
import { uuidState } from "../../state/uuidState";
import {
  getUUid1Token,
  getUUid2Token,
  setUUidToken,
} from "../../repository/GuestUuidRespository";

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

function NotificationItem({ data }) {
  if (data === null || data === undefined) {
    return <></>;
  }
  const NAME = data.name;
  const ATTEND = data.attend;
  if (data.type === "attend") {
    return (
      <AlarmDiv>
        <BsFillEnvelopeFill style={{ width: "21px", height: "21px" }} />
        <AlarmAttendText>
          {ATTEND === "UNKNOWN" ? (
            <span>{NAME}님이 미정에 체크하셨습니다.</span>
          ) : (
            <span>
              {NAME}님이
              {ATTEND === "NO" ? <span> 불참석</span> : <span> 참석</span>}에
              체크하셨습니다.
            </span>
          )}
        </AlarmAttendText>
      </AlarmDiv>
    );
  }
  return (
    <AlarmDiv>
      <CiMoneyBill style={{ width: "50px", height: "21px" }} />
      <AlarmDonationText>
        {NAME}님이 {data.goods}에 {data.donation}원을 후원하셨습니다.
      </AlarmDonationText>
    </AlarmDiv>
  );
}

//로그인상태에따른 navbar click 행위 핸들링
function MarriedNavbar({ token, setNavbar }) {
  const tokenState = token === null || token === undefined;
  const navbarClose = () => {
    if (tokenState) {
      alert("로그인 정보가 올바르지 못합니다.");
      setNavbar(false);
      return;
    }
    setNavbar(false);
  };

  if (tokenState) {
    return (
      <TopItem>
        <TopTitleText>카테고리</TopTitleText>
        <LinkInput onClick={navbarClose}>
          <AiOutlineShoppingCart
            style={{ marginRight: "5px", marginLeft: "3px" }}
          />
          상품 리스트
          <MdKeyboardArrowRight style={{ marginLeft: "auto" }} />
        </LinkInput>
        <LinkInput onClick={navbarClose}>
          <AiOutlineFileSync
            style={{ marginRight: "5px", marginLeft: "3px" }}
          />
          관리 페이지
          <MdKeyboardArrowRight style={{ marginLeft: "auto" }} />
        </LinkInput>
        <LinkInput onClick={navbarClose}>
          <AiOutlinePicture style={{ marginRight: "5px", marginLeft: "3px" }} />
          갤러리 페이지
          <MdKeyboardArrowRight style={{ marginLeft: "auto" }} />
        </LinkInput>
        <LinkInput onClick={navbarClose}>
          <BsCalendar2Heart style={{ marginRight: "5px", marginLeft: "3px" }} />
          위시 리스트/메모장
          <MdKeyboardArrowRight style={{ marginLeft: "auto" }} />
        </LinkInput>
      </TopItem>
    );
  } else {
    return (
      <TopItem>
        <TopTitleText>카테고리</TopTitleText>
        <LinkInput to="/GoodsProduct" onClick={navbarClose}>
          <AiOutlineShoppingCart
            style={{ marginRight: "5px", marginLeft: "3px" }}
          />
          상품 리스트
          <MdKeyboardArrowRight style={{ marginLeft: "auto" }} />
        </LinkInput>
        <LinkInput to="/admin" onClick={navbarClose}>
          <AiOutlineFileSync
            style={{ marginRight: "5px", marginLeft: "3px" }}
          />
          관리 페이지
          <MdKeyboardArrowRight style={{ marginLeft: "auto" }} />
        </LinkInput>
        <LinkInput to="/GalleryWedding" onClick={navbarClose}>
          <AiOutlinePicture style={{ marginRight: "5px", marginLeft: "3px" }} />
          갤러리 페이지
          <MdKeyboardArrowRight style={{ marginLeft: "auto" }} />
        </LinkInput>
        <LinkInput to="/admin/memo" onClick={navbarClose}>
          <BsCalendar2Heart style={{ marginRight: "5px", marginLeft: "3px" }} />
          위시 리스트/메모장
          <MdKeyboardArrowRight style={{ marginLeft: "auto" }} />
        </LinkInput>
      </TopItem>
    );
  }
}

function GuestNavbar({ setNavbar }) {
  const uuidStateData = useRecoilValue(uuidState);
  return (
    <GuestTopItem>
      <TopTitleText>카테고리</TopTitleText>
      <LinkInput
        to={`/GoodsSupport/${uuidStateData.uuidFirst}/${uuidStateData.uuidSecond}`}
        onClick={() => setNavbar(false)}
      >
        <AiOutlineShoppingCart
          style={{ marginRight: "5px", marginLeft: "3px" }}
        />
        상품 리스트
        <MdKeyboardArrowRight style={{ marginLeft: "auto" }} />
      </LinkInput>
      <LinkInput
        to={`/GallerySupport/${uuidStateData.uuidFirst}/${uuidStateData.uuidSecond}`}
        onClick={() => setNavbar(false)}
      >
        <AiOutlinePicture style={{ marginRight: "5px", marginLeft: "3px" }} />
        갤러리 페이지
        <MdKeyboardArrowRight style={{ marginLeft: "auto" }} />
      </LinkInput>
    </GuestTopItem>
  );
}

export default function Navbar({
  setNavbar,
  token,
  uuid1,
  guestState,
  pathUuidFirst,
}) {
  console.log(guestState);
  const [_, nickName] = useTokenDecode(token);
  const [navbarNotification, setNavbarNotification] = useState([]);
  const navigate = useNavigate();
  const localUuid1 = getUUid1Token();
  const navbarState = () => setNavbar(false);
  const localUuid2 = getUUid2Token();
  async function getNavibarNotificationRender() {
    const navbarData = await getAlarm();
    setNavbarNotification(navbarData.data);
  }
  console.log(pathUuidFirst);
  async function getGoodsUrlUuidRender() {
    const UUID = await getGoodsUrlUUID();

    if (!localUuid1) {
      setUUidToken(UUID.data.uuidFirst, UUID.data.uuidSecond);
    }
  }
  console.log(_);
  function guestStateRender() {
    const uuidState = localUuid1 || localUuid2;
    if (uuidState) {
      removeAccessToken();
      navigate(`/Guest/${localUuid1}/${localUuid2}`);
      setNavbar(false);
      alert("로그아웃");
      return;
    }
  }

  const removeAcctokenRender = () => {
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
    if (uuid1) {
      return;
    }
    if (!localUuid1) {
      getGoodsUrlUuidRender();
    }
  }, []);
  useEffect(() => {
    if (token) getNavibarNotificationRender();
  }, []);

  const urlLinkClick = (first, secound) => {
    if (token) {
      clipboardHandle(first, secound);
    }
  };

  const clipboardHandle = (first, secound) => {
    try {
      navigator.clipboard.writeText(
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
              <BsPersonGear
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
                  onClick={navbarState}
                >
                  <span>로그인을 진행해주세요.</span>
                </Link>
              )}
            </NickNameText>
          </NickNamediv>
          <MarriedNavbar token={token} setNavbar={setNavbar} />
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
              onClick={() => urlLinkClick(localUuid1, localUuid2)}
            >
              링크 공유하기
            </span>
            {token ? (
              <LogButton onClick={removeAcctokenRender}>Log out</LogButton>
            ) : (
              <Link to="/signin" onClick={navbarState}>
                <LogButton>Login</LogButton>
              </Link>
            )}
          </BottomItemDiv>
        </Base>
      ) : (
        <GuestBase>
          <Title>ZOLABAYO</Title>
          <NickNamediv>
            <NickNameText>
              <BsPersonGear
                style={{ width: "25px", height: "27px", marginRight: "5px" }}
              />
              {nickName ? (
                <span>{nickName}님을 환영합니다.</span>
              ) : (
                <span>로그인을 진행해주세요.</span>
              )}
            </NickNameText>
          </NickNamediv>
          <GuestNavbar setNavbar={setNavbar} />
          <GuestBottomItemDiv>
            <LogButton onClick={removeAcctokenRender}>Log out</LogButton>
          </GuestBottomItemDiv>
        </GuestBase>
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

const GuestBase = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
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

const GuestTopItem = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  padding: 5px;
  height: 130px;
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

const GuestBottomItemDiv = styled.div`
  display: flex;
  justify-content: space-around;
  height: 30px;
  align-items: center;
  position: absolute;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  bottom: 0;
  width: 100%;
`;

const AlarmDiv = styled.div`
  width: 95%;
  font-weight: 400;
  font-size: 15px;
  line-height: 27px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: 140px;
  margin-left: 5px;
`;
const AlarmAttendText = styled.p`
  margin-left: 5px;
  :after {
    content: "";
    opacity: 0.3;
    width: 20px;
    border: 1px solid #000000;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    margin-top: 13px;
  }
`;

const AlarmDonationText = styled.p`
  margin-left: 5px;
  :after {
    content: "";
    opacity: 0.3;
    width: 20px;
    border: 1px solid #000000;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    margin-top: 13px;
  }
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
