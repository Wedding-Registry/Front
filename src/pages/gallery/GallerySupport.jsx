import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import GallerySupportContainer from "../../containers/gallery/GallerySupportContainer";
import { getAccessToken } from "../../repository/AuthTokenRepository";
import { useSetRecoilState } from "recoil";
import { prevUrlPathState } from "../../state/prevUrlPathState";
import { uuidState } from "../../state/uuidState";

const token = getAccessToken();
export default function GallerySupport() {
  const [tokenData, setTokenData] = useState();
  const setUuidUrl = useSetRecoilState(uuidState);
  const location = useLocation();
  const prevUrlPathName = location.pathname;
  const [uuidFirst, uuidSecound] = prevUrlPathName.split("/").slice(2, 5);

  const data = useSetRecoilState(prevUrlPathState);

  const navigator = useNavigate();
  useEffect(() => {
    data(prevUrlPathName);
  }, []);
  useEffect(() => {
    if (token == null && token == undefined) {
      navigator("/signin");
    }
    setTokenData(token);
  }, [tokenData]);
  useEffect(() => {
    setUuidUrl({
      uuidFirst: uuidFirst,
      uuidSecond: uuidSecound,
    });
  }, [prevUrlPathName]);
  return <GallerySupportContainer />;
}
