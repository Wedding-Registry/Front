import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";

import {
  getWeddingAttendList,
  postWeddingAttendList,
} from "../../services/gustGoods/GuestMarriedService";
import { media } from "../../style/media";

//라디오 버튼
export default function RadioButtonGroup({ guestToken }) {
  const [attendData, setAttendData] = useState([]);

  //radiobutton change 값
  const radioWeddingAdttendChange = (e) => {
    postWeddingAttnedListRender(e.target.value, guestToken);
  };
  // 첫페이지 렌더링시 참석 여부 불러오기
  async function getWeddingAttnedListRender(guestToken) {
    const getAttendData = await getWeddingAttendList(guestToken);
    setAttendData(getAttendData.data?.attend);
  }
  //참석 여부 post
  async function postWeddingAttnedListRender(radioButtonValue, guestToken) {
    const postAttendData = await postWeddingAttendList(
      radioButtonValue,
      guestToken
    );
    setAttendData(postAttendData.data.attend);
  }

  useEffect(() => {
    getWeddingAttnedListRender(guestToken);
  }, []);

  return (
    <>
      <WeddingYn>
        <div>
          <p>결혼식 참석 여부를 알려주세요.</p>
          <label>
            <input
              type="radio"
              name="attend"
              id="yesAttend"
              value="yes"
              checked={attendData === "yes"}
              onChange={radioWeddingAdttendChange}
              style={{ marginTop: "10px" }}
            />
            참석
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="attend"
              id="noAttend"
              value="no"
              onChange={radioWeddingAdttendChange}
              checked={attendData === "no"}
              style={{ marginTop: "10px" }}
            />
            불참석
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="attend"
              id="unknownAttend"
              value="unknown"
              onChange={radioWeddingAdttendChange}
              checked={attendData === "unknown"}
              style={{ marginTop: "10px" }}
              readOnly
            />
            미정
            <br />
          </label>
        </div>
      </WeddingYn>
    </>
  );
}

const WeddingYn = styled.div`
  display: flex;
  width: 40%;
  ${media.mobile`
    display: flex;
    font-size:11px;
    margin-top:25px;
    width:100%;
    position: absolute;
    top: 12%;
  `};
`;
