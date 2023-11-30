import React, { memo, useCallback, useMemo } from "react";

import styled from "styled-components";

import wishlist from "../../assets/icons/wishlist.png";

import { AiOutlineShoppingCart } from "@react-icons/all-files/ai/AiOutlineShoppingCart";
import { MdKeyboardArrowRight } from "@react-icons/all-files/md/MdKeyboardArrowRight";
import { AiOutlinePicture } from "@react-icons/all-files/ai/AiOutlinePicture";
import { Link } from "react-router-dom";

function GuestNavbarItem({ onNavbarOpen, uuidFirst, uuidSecound }) {
  const handleNavbarClose = () => onNavbarOpen(false);
  return (
    <GuestTopItem>
      <TopTitleText>카테고리</TopTitleText>
      <LinkInput
        to={`/GoodsSupport/${uuidFirst}/${uuidSecound}`}
        onClick={handleNavbarClose}
      >
        <AiOutlineShoppingCart
          style={{ marginRight: "5px", marginLeft: "3px" }}
        />
        상품 리스트
        <MdKeyboardArrowRight style={{ marginLeft: "auto" }} />
      </LinkInput>
      <LinkInput
        to={`/GallerySupport/${uuidFirst}/${uuidSecound}`}
        onClick={handleNavbarClose}
      >
        <AiOutlinePicture style={{ marginRight: "5px", marginLeft: "3px" }} />
        갤러리 페이지
        <MdKeyboardArrowRight style={{ marginLeft: "auto" }} />
      </LinkInput>
    </GuestTopItem>
  );
}

function GuestNavbar({
  nickName,
  handleLogoutButton,
  setNavbar,
  uuidFirst,
  uuidSecound,
}) {
  const memizedNickname = useMemo(() => {
    return nickName;
  }, [nickName]);
  const memoizeduuidFrist = useMemo(() => {
    return uuidFirst;
  }, [uuidFirst]);

  const memoizeduuidSecound = useMemo(() => {
    return uuidSecound;
  }, [uuidSecound]);

  const handlemomoizedCallback = useCallback(() => {
    setNavbar(false);
  }, []);
  return (
    <GuestBase>
      <Title>ZOLABAYO</Title>
      <NickNamediv>
        <NickNameText>
          <img
            src={wishlist}
            style={{ width: "25px", height: "27px", marginRight: "5px" }}
          />
          {memizedNickname ? (
            <span>{memizedNickname}님을 환영합니다.</span>
          ) : (
            <span>로그인을 진행해주세요.</span>
          )}
        </NickNameText>
      </NickNamediv>
      <GuestNavbarItem
        setNavbar={handlemomoizedCallback}
        uuidFirst={memoizeduuidFrist}
        uuidSecound={memoizeduuidSecound}
      />
      <GuestBottomItemDiv>
        <LogButton onClick={handleLogoutButton}>Log out</LogButton>
      </GuestBottomItemDiv>
    </GuestBase>
  );
}

export default memo(GuestNavbar);

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

const GuestTopItem = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  padding: 5px;
  height: 130px;
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
