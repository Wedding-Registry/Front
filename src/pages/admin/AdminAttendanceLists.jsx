import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import AdminLists from "../../components/AdminLists.jsx";
// import * as XLSX from "xlsx";
import AdminAttendanceListsContainer from "../../containers/admin/AdminAttendanceListsContainer.jsx";
import AdminContainer from "@/containers/admin/AdminContainer.jsx";
// import axios from "axios";
// import _ from "lodash";
// import { useQuery } from "@tanstack/react-query";

ChartJS.register(ArcElement, Tooltip, Legend);

// 결혼식 참석여부 리스트 페이지
function AdminAttendanceLists() {
  // FIXME 이후 실 data 받아 적용

  // const [attendance, setAttendance] = useState([]);
  // const [absence, setAbsence] = useState([]);
  // const [undecided, setUndecided] = useState([]);

  return (
    <>
      <AdminContainer />
      <AdminAttendanceListsContainer />
      <AdminLists></AdminLists>
    </>
  );
}

export default AdminAttendanceLists;
