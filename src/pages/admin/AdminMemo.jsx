import React from "react";
import styled from "styled-components";
import AdminMemoContainer from "@/containers/admin/AdminMemoContainer.jsx";

const StyledDiv = styled.div``;

function AdminMemo() {
  return (
    <StyledDiv>
      <AdminMemoContainer></AdminMemoContainer>
    </StyledDiv>
  );
}

export default AdminMemo;
