import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authTokenAtom } from "@/state/authState.js";
import { prevUrlPathState } from "../../state/prevUrlPathState";
import HttpClient from "@/apis/HttpClient.js";

const StyledWrapper = styled.div`
  width: 100%;
  min-width: 344px;
  margin-top: 4.5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(234, 234, 234, 0.4);
  .left {
    margin-top: 0.5rem;
    justify-self: flex-start;
    margin-bottom: 2rem;
  }
`;

const StyledInput = styled.input`
  min-width: 344px;
  min-height: 44px;
  margin-bottom: 0.5rem;
  border: 1px solid #818387;
  border-radius: 10px;
  padding-left: 0.8rem;
`;

const StyledDiv = styled.div`
  display: flex;
  min-width: 344px;

  justify-content: center;
  align-items: center;
  span:first-child {
    align-self: flex-start;
    flex-grow: 1;
  }
  span:nth-child(2) {
    margin-right: 1rem;
  }
`;

const StyledButton = styled.button`
  min-width: 374px;
  min-height: 44px;
  border-radius: 10px;
  color: #fff;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  background-color: #000000b2;
  border: none;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  margin-top: 1.5em;
`;

const StyledSpan = styled.span``;

function SignInForm() {
  const setAuthToken = useSetRecoilState(authTokenAtom);
  const urlPathState = useRecoilValue(prevUrlPathState);
  const navigate = useNavigate();
  const initInputValue = {
    email: "",
    password: "",
  };

  const [inputValue, setInputValue] = useState(initInputValue);

  const onChangeInputValue = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value.toString().trim(),
    });
  };

  const apiUrl = import.meta.env.VITE_HTTP_API_URL;

  const handleLogin = async () => {
    try {
      const response = await HttpClient.post(`${apiUrl}login/service`, {
        email: inputValue.email,
        password: inputValue.password,
      });

      if (response.data.status === 200) {
        const { accessToken, refreshToken } = response.data.data;
        setAuthToken({ accessToken: accessToken, refreshToken: refreshToken });
        localStorage.setItem("refreshToken", accessToken);
        localStorage.setItem("accessToken", refreshToken);

        if (urlPathState.length > 0) {
          window.location.assign(urlPathState);
          return;
        }
        alert(`로그인 성공`);
        navigate("/");
      } else {
        console.log("로그인 실패");
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login 실패:", error);
    }
  };

  function onClickButton(event) {
    event.preventDefault();
    handleLogin();
  }

  return (
    <StyledWrapper>
      <StyledInput
        type="text"
        name="email"
        value={inputValue.email}
        onChange={onChangeInputValue}
        placeholder="Email"
      />
      <StyledInput
        type="password"
        name="password"
        value={inputValue.password}
        onChange={onChangeInputValue}
        placeholder="비밀번호"
      />
      <StyledDiv>
        <StyledSpan onClick={() => navigate(`/signup`)}>
          회원가입 하기
        </StyledSpan>
        <StyledSpan>아이디 찾기</StyledSpan>
        <StyledSpan>비밀번호 찾기</StyledSpan>
      </StyledDiv>
      <StyledButton onClick={onClickButton}>로그인 하기</StyledButton>
    </StyledWrapper>
  );
}

export default SignInForm;
