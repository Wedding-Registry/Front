import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const StyledNav = styled.nav`
  width: 1285px;
  margin: auto;
  ul {
    margin: auto;
    display: flex;
    width: 1255px;
    justify-content: space-between;
    align-items: center;
    height: 37px;
    a {
      text-decoration: none;
      color: #000;
    }
  }
  border-top: 1px solid #b0b0b0;
  border-bottom: 1px solid #b0b0b0;
`;

function AdminContainer() {
  return (
    <StyledNav>
      <ul>
        <li>
          <Link to="/admin">관리 페이지</Link>
        </li>
        <li>
          <Link to="/admin/donation">후원자 리스트</Link>
        </li>
        <li>
          <Link to="/admin/attendance">결혼식 참석 여부 리스트</Link>
        </li>
        <li>
          <Link to="/admin/alarm">알림 목록</Link>
        </li>
      </ul>
    </StyledNav>
  );
}

export default AdminContainer;
