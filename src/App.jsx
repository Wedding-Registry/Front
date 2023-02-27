import React from 'react'
import { Routes, Route } from "react-router-dom";
// 페이지 불러오기
import Layout from './pages/Layout'
import Home from './pages/Home'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import GalleryWedding from './pages/GalleryWedding';
import GallerySupport from './pages/GallerySupport';
import GoodsSupport from './pages/GoodsSupport';
import GoodsProduct from './pages/GoodsProduct';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* url경로 별 랜더링 페이지 */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/GalleryWedding" element={<GalleryWedding />} />
          <Route path="/GallerySupport" element={<GallerySupport />} />
          <Route path="/GoodsSupport" element={<GoodsSupport />} />
          <Route path="/GoodsProduct" element={<GoodsProduct />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
