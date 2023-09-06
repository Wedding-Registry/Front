import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import AdminLists from "../../components/AdminLists.jsx";
import AdminAttendanceListsContainer from "../../containers/admin/AdminAttendanceListsContainer.jsx";
import AdminContainer from "@/containers/admin/AdminContainer.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);

// 결혼식 참석여부 리스트 페이지
function AdminAttendanceLists() {
  return (
    <>
      <AdminContainer />
      <AdminAttendanceListsContainer />
      <AdminLists />
    </>
  );
}

export default AdminAttendanceLists;
