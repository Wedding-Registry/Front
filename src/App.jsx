import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
// Reset CSS
import { Reset } from "styled-reset";

// 페이지 불러오기
//import Layout from "./pages/Layout";
import Home from "./pages/Home";
// 절대경로 설정 예시 // @사용
import NotFound from "@/pages/NotFound";
// import NotFound from './pages/NotFound'

//메인 페이지
import Main from "./pages/main/MainPage";

// 관리자 페이지
import AdminMain from "@/pages/admin/AdminMain.jsx";
import AdminAlarmLists from "./pages/admin/AdminAlarmLists.jsx";
import AdminAttendanceLists from "./pages/admin/AdminAttendanceLists.jsx";
import AdminDonationLists from "./pages/admin/AdminDonationLists.jsx";
import AdminMemo from "./pages/admin/AdminMemo.jsx";

// 상품 갤러리
import GalleryWedding from "./pages/gallery/GalleryWedding";
import GallerySupport from "./pages/gallery/GallerySupport";
import GoodsSupport from "./pages/goods/GoodsSupport";
import GoodsProduct from "./pages/goods/GoodsProduct";

//상품 박스 Test
import Header from "./components/header/Header";
import SignUp from "@/pages/signup/SignUp.jsx";
import SignIn from "@/pages/signin/SignIn.jsx";
import Callback from "@/containers/signin/CallBack.jsx";
import SignUpMoreInfo from "@/pages/signup/SignUpMoreInfo.jsx";

function App() {
  //header 여기서 호출해야하나?
  // 이유는 main 화면에서는 header 선이 없기 때문
  // 페이지 에따른 header border 선 처리
  const location = useLocation();
  const [border, setBorder] = useState(false);
  useEffect(() => {
    if (location.pathname === "/") {
      setBorder(true);
    }
  }, []);

  return (
    <>
      <Reset />
      <Header border={border} />
      <Routes>
        {/* url경로 별 랜더링 페이지 */}
        <Route path="/" element={<Main />} />
        <Route element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signup-moreinfo" element={<SignUpMoreInfo />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="callback" element={<Callback />} />
        <Route path="admin" element={<AdminMain />} />
        <Route path="admin/alarm" element={<AdminAlarmLists />} />
        <Route path="admin/attendance" element={<AdminAttendanceLists />} />
        <Route path="admin/donation" element={<AdminDonationLists />} />
        <Route path="admin/memo" element={<AdminMemo />} />
        <Route path="/GalleryWedding" element={<GalleryWedding />} />
        <Route path="/GoodsProduct" element={<GoodsProduct />} />
        <Route path="/Guest/:uuid1/:uuid2" element={<Main />} />
        <Route path="/GoodsSupport/:uuid1/:uuid2" element={<GoodsSupport />} />
        <Route
          path="/GallerySupport/:uuid1/:uuid2"
          element={<GallerySupport />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
