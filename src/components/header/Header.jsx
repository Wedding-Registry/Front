import React, { useEffect, useState } from "react";
import styled from "styled-components";

import logo from "@/assets/icons/logo.png";
import Person from "@/assets/icons/person.png";
import Menu from "@/assets/icons/menu.png";
import Navbar from "../navbar/Navbar";
import { Link, useLocation } from "react-router-dom";
import { getAccessToken } from "../../repository/AuthTokenRepository";
import { media } from "../../style/media";

function TokenStatusLink({ token, setNavbar, navbar }) {
  if (token === null || token === undefined || token === false) {
    return (
      <RightLogo>
        <Link to="/signin" onClick={() => setNavbar(false)}>
          <PersonLogo src={Person} style={{ marginRight: "1vw" }} />
        </Link>
        <HamberLogo
          src={Menu}
          onClick={() => {
            setNavbar(!navbar);
          }}
        />
      </RightLogo>
    );
  } else {
    return (
      <RightLogo>
        <Link onClick={() => setNavbar(false)}>
          <PersonLogo src={Person} style={{ marginRight: "1vw" }} />
        </Link>
        <HamberLogo
          src={Menu}
          onClick={() => {
            setNavbar(!navbar);
          }}
        />
      </RightLogo>
    );
  }
}

export default function Header({ border }) {
  const [navbar, setNavbar] = useState(false);
  //true가 게스트 상태 false가 기본 상태
  const [guestState, setGuestState] = useState(false);

  const path = useLocation();
  const urlPathName = path.pathname.trim().split("/")[1];
  const uuidFirst = path.pathname.trim().split("/")[2];
  const uuidSecound = path.pathname.trim().split("/")[3];
  const token = getAccessToken();
  useEffect(() => {
    if (
      urlPathName === "GallerySupport" ||
      urlPathName === "GoodsSupport" ||
      urlPathName === "Guest"
    ) {
      setGuestState(true);
    }
  }, [uuidFirst]);
  return (
    <>
      <HeaderDiv isBoolean={border}>
        <HeaderLogoDiv>
          <div>
            {uuidFirst !== undefined ? (
              <Link
                to={`/Guest/${uuidFirst}/${uuidSecound}`}
                onClick={() => setNavbar(false)}
              >
                <Logo src={logo} />
              </Link>
            ) : (
              <Link to="/" onClick={() => setNavbar(false)}>
                <Logo src={logo} />
              </Link>
            )}
          </div>
          <TokenStatusLink
            setNavbar={setNavbar}
            navbar={navbar}
            token={token}
          />
        </HeaderLogoDiv>
      </HeaderDiv>
      {navbar ? (
        <Navbar
          setNavbar={setNavbar}
          token={token}
          uuidFirst={uuidFirst}
          guestState={guestState}
        />
      ) : null}
    </>
  );
}

const HeaderDiv = styled.header`
  height: 9vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${(props) =>
    props.isBoolean ? "" : "1px solid rgba(176,176,176,0.3)"};
  ${media.mobile`
    display:flex;
    justify-content: flex-end;
  `}
`;

const HeaderLogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 76px;
  height: 54px;
  ${media.mobile`
    display:none;
  `};
`;

const PersonLogo = styled.img`
  width: 31px;
  height: 31px;
`;
const HamberLogo = styled.img`
  width: 31px;
  height: 31px;
`;

const RightLogo = styled.div`
  position: absolute;
  top: 1;
  right: 0;
  margin-right: 5rem;
  ${media.mobile`
    display:flex;
    justify-content: flex-end;
    width:100%;
    gap:1em;
    margin-right:1em;
  `}
`;
