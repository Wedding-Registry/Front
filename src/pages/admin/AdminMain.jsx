import React from "react";
import styled from "styled-components";
import AdminMainContainer from "@/containers/admin/AdminMainContainer.jsx";
import AdminContainer from "@/containers/admin/AdminContainer.jsx";

const StyledDiv = styled.div`
  height: 100vh;
`;

function AdminMain() {
  return (
    <StyledDiv>
      <AdminContainer />
      <AdminMainContainer />
    </StyledDiv>
  );
}

export default AdminMain;
