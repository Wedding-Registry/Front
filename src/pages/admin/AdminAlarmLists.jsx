import React from "react";
import AdminAlarmListsContainer from "../../containers/admin/AdminAlarmListsContainer.jsx";
import AdminContainer from "@/containers/admin/AdminContainer.jsx";

// 알림 목록 확인 페이지
function AdminAlarmLists() {
  return (
    <>
      <AdminContainer />
      <AdminAlarmListsContainer />
    </>
  );
}

export default AdminAlarmLists;
