import React, { useEffect, useState } from "react";
import MainContainer from "../../containers/main/MainContainer";

export default function MainPage() {
  const [getTokenData, setGuestTokenData] = useState();
  const guestToken = localStorage.getItem("Guest-Info");

  useEffect(() => {
    setGuestTokenData(guestToken);
  }, [getTokenData]);

  return <MainContainer guestToken={getTokenData} />;
}
