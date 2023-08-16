import React, { useEffect, useState } from "react";
import GoodsSupportContainer from "../../containers/goods/GoodsSupportContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { prevUrlPathState } from "../../state/prevUrlPathState";
import { getAccessToken } from "../../repository/AuthTokenRepository";
import { getGuestToken } from "../../repository/GuestAuthTokenRepository";

export default function GoodsSupport() {
  const [tokenData, setTokenData] = useState();
  const [guestTokenData, setGuestTokenData] = useState();
  const token = getAccessToken();
  const guestToken = getGuestToken();
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

  useEffect(() => {
    setGuestTokenData(guestToken);
  }, [guestTokenData]);

  return <GoodsSupportContainer guestToken={guestToken} />;
}
