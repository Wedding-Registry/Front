import React, { useState } from "react";
import styled from "styled-components";

import logo from "@/assets/icons/logo.png";
import Person from "@/assets/icons/person.png";
import Menu from "@/assets/icons/menu.png";
import Navbar from "../navbar/Navbar";
import { Link, useLocation } from "react-router-dom";
import { getAccessToken } from "../../repository/AuthTokenRepository";
import { useRecoilValue } from "recoil";
import { uuidState } from "../../state/uuidState";

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
  const uuidStateValue = useRecoilValue(uuidState);
  const path = useLocation();
  const uuid1 = path.pathname.trim().split("/")[2];
  const token = getAccessToken();

  return (
    <>
      <HeaderDiv isBoolean={border}>
        <HeaderLogoDiv>
          <div>
            {uuidStateValue.uuidFirst === uuid1 ? (
              <Link
                to={`/Guest/${uuidStateValue.uuidFirst}/${uuidStateValue.uuidSecond}`}
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
        <Navbar setNavbar={setNavbar} token={token} uuid1={uuid1} />
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
`;

const HeaderLogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 76px;
  height: 54px;
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
`;
