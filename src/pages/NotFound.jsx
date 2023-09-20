import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  width: 100%;
  height: 80vh;
  margin: 18rem auto 0;
  text-align: center;
  font-weight: 600;

  h3 {
    font-size: 22px;
  }
  p {
    margin: 1.5rem auto 0;
  }
`;

function NotFound() {
  return (
    <StyledDiv>
      <h3>Not Found</h3>
      <p>해당 페이지를 찾을 수 없습니다</p>
    </StyledDiv>
  );
}

export default NotFound;
