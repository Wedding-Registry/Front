import React from 'react'
import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Link to="/GoodsProduct">상품 등록 페이지</Link>
        </li>
        <li>
          <Link to="/GoodsSupport">상품 후원 페이지</Link>
        </li>
        <li>
          <Link to="/GalleryWedding">갤러리 페이지</Link>
        </li>
        <li>
          <Link to="/GallerySupport">갤러리 후원 페이지</Link>
        </li>
      </ul>
    </nav>

    <hr />
    <Outlet />
  </div>
  )
}

export default Layout