import { Base64 } from "js-base64";
import { useEffect, useState } from "react";

export default function useTokenDecode(token) {
  const [decodeToken, setDecodeToken] = useState({
    boardsId: "",
    userName: "",
  });
  useEffect(() => {
    if (token != null) {
      const payload = token.split(".").slice(1, 2).join("");
      const { boardsId, userName } = JSON.parse(Base64.decode(payload));
      setDecodeToken({
        boardsId: boardsId,
        userName: userName,
      });
    }
  }, [decodeToken.boardsId, token]);
  return [decodeToken.boardsId, decodeToken.userName];
}
