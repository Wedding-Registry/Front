import React from "react";
import styled from "styled-components";
import SignUpForm from "@/components/signup/SignUpForm.jsx";
import GoogleSignInButton from "@/components/signin/GoogleSignInButton.jsx";
import KakaoSignInButton from "@/components/signin/KakaoSignInButton.jsx";
const SignInStyled = styled.div`
  width: 100%;
  height: 98vh;
  div.wrapper {
    background: rgba(234, 234, 234, 0.7);
    margin: 5em auto 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0.7;
    border-radius: 3rem;
    border: 1px solid rgba(0, 0, 0, 0.4);
    box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.25);
    min-height: 573px;
    width: 50%;
    min-width: 653px;
  }
`;
export default function SignUpContainer() {
  return (
    <SignInStyled>
      <div className="wrapper">
        <SignUpForm></SignUpForm>
        <GoogleSignInButton></GoogleSignInButton>
        <KakaoSignInButton></KakaoSignInButton>
      </div>
    </SignInStyled>
  );
}
