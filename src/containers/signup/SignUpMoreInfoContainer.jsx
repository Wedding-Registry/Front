import React from "react";
import styled from "styled-components";
import SignUpMoreInfo from "@/components/signup/SignUpMoreInfo.jsx";
const SignInStyled = styled.div`
  
  div.wrapper {
  background: rgba(234, 234, 234, .7);
  margin: 5em auto 5rem;
  display: flex;
  flex-direction: column; 
  align-items: center;
  opacity: 0.7;
  border-radius: 3rem;
  border: 1px solid rgba(0, 0, 0, 0.4);
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.25);
  width: 50%;
  min-width: 653px;
  }
`
export default function SignUpMoreInfoContainer() {
  return <SignInStyled>
    <div className="wrapper">
      <SignUpMoreInfo></SignUpMoreInfo>
    </div>
  </SignInStyled>;
}
