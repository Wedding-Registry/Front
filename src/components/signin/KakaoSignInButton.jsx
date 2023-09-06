import React from "react";
import styled from "styled-components";
import kakao from "@/assets/icons/kakao.svg";
import KakaoLogin from "react-kakao-login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authTokenAtom } from "@/state/authState.js";
import { prevUrlPathState } from "../../state/prevUrlPathState";

const StyledDiv = styled.div`
  border: none;
  height: 45px;
  width: 40%;
  margin-bottom: 3rem;
  min-width: 350px;
  background-color: #fee500;
  border-radius: 10px;
  margin-top: 0.5rem;
  position: relative;

  ::before {
    content: "";
    width: 32px;
    display: block;
    height: 33px;
    top: 15%;
    position: absolute;
    margin-left: 0.5rem;
    background: url(${kakao}) no-repeat;
  }
`;

const KakaoSignInButton = () => {
  const navigate = useNavigate();
  const setAuthToken = useSetRecoilState(authTokenAtom);
  const urlPathState = useRecoilValue(prevUrlPathState);
  const kakaoClientId = import.meta.env.VITE_KAKAO_JS_KEY;
  const apiUrl = import.meta.env.VITE_HTTP_API_URL;
  const kakaoOnSuccess = async (data) => {
    // console.log(data.profile.id);
    // console.log(data.profile.kakao_account.email);

    const response = await axios.post(`${apiUrl}login/oauth/kakao`, {
      email: data.profile.kakao_account.email,
      password: "K" + data.profile.id,
    });
    // sns 로그인 최초
    if (response.data.data.needMoreInfo) {
      navigate("/signup-moreinfo", {
        state: {
          password: "K" + data.profile.id,
          email: data.profile.kakao_account.email,
        },
      });
    } else {
      alert("로그인 성공!");

      const { accessToken, refreshToken } = response.data.data;

      setAuthToken({ accessToken: accessToken, refreshToken: refreshToken });

      localStorage.setItem("refreshToken", accessToken);
      localStorage.setItem("accessToken", refreshToken);
      if (urlPathState.length > 0) {
        window.location.assign(urlPathState);
        return;
      }
      navigate("/");
    }
  };
  const kakaoOnFailure = (error) => {
    console.log(error);
  };
  return (
    <StyledDiv>
      <KakaoLogin
        token={kakaoClientId}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
        onLogout={console.info}
        style={{
          backgroundColor: "#fee500",
          border: "none",
          height: "3.2em",
          width: "100%",
          minWidth: "140px",
        }}
      ></KakaoLogin>
    </StyledDiv>
  );
};

export default KakaoSignInButton;
