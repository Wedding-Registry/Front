import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import GallerySupportContainer from "../../containers/gallery/GallerySupportContainer";
import { getAccessToken } from "../../tokens/token";
import { useSetRecoilState } from "recoil";
import { prevUrlPathState } from "../../state/prevUrlPathState";

const token = getAccessToken();
export default function GallerySupport() {
  const [tokenData, setTokenData] = useState();
  const location = useLocation();
  const prevUrlPathName = location.pathname;
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
  return <GallerySupportContainer />;
}
