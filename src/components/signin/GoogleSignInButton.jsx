import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import styled from "styled-components";
import googlelogo from "../../assets/icons/google.svg";
import { useNavigate } from "react-router-dom";
import { authTokenAtom } from "@/state/authState.js";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { prevUrlPathState } from "../../state/prevUrlPathState";

const StyledButton = styled.button`
  border: none;
  height: 45px;
  width: 40%;
  min-width: 350px;
  background-color: #fff;
  border-radius: 10px;

  position: relative;

  ::before {
    content: "";
    width: 32px;
    display: block;
    height: 33px;
    top: 20%;
    position: absolute;
    align-items: center;
    justify-content: center;
    margin-left: 0.5rem;
    background: url(${googlelogo}) no-repeat;
  }
`;

function GoogleButton() {
  const navigate = useNavigate();
  const setAuthToken = useSetRecoilState(authTokenAtom);
  const urlPathState = useRecoilValue(prevUrlPathState);
  const apiUrl = import.meta.env.VITE_HTTP_API_URL;

  const googleLogin = useGoogleLogin({
    onSuccess: async (res) => {
      // console.log(res.access_token);

      const {
        data: { email, sub },
      } = await axios.get("https://openidconnect.googleapis.com/v1/userinfo", {
        params: {
          access_token: res.access_token,
        },
      });


      const response = await axios.post(`${apiUrl}login/oauth/google`, {
        email: email,
        password: "G" + sub,
      });

      // sns 로그인 최초
      if (response.data.data.needMoreInfo) {
        navigate("/signup-moreinfo", {
          state: { password: "G" + sub, email: email },
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
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <StyledButton onClick={googleLogin}>구글 계정으로 로그인</StyledButton>
  );
}

export default GoogleButton;
