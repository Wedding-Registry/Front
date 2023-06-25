import React from "react";
import GoodsProductContainer from "../../containers/goods/GoodsProductContainer";

import { getAccessToken } from '../../tokens/token';

export default function GoodsProduct() {
  const token = getAccessToken();
  return <GoodsProductContainer token={token}/>
}
