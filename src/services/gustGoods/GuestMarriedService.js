import HttpClient from "../../apis/HttpClient";

// 후원 페이지 이름,계좌,장소,시간
async function getInforMationList(guestToken) {
  try {
    const res = await HttpClient.get(`invitation/weddingHall/info`, {
      headers: {
        "Guest-Info": `${guestToken}`,
      },
    });
    const data = res.data;
    return data;
  } catch (e) {
    console.error(e);
  }
}

//참석 정보
async function getWeddingAttendList(guestToken) {
  try {
    const res = await HttpClient.get(`invitation/weddingHall/attendance`, {
      headers: {
        "Guest-Info": `${guestToken}`,
      },
    });
    const data = res.data;
    return data;
  } catch (e) {
    console.error(e);
  }
}

//참석,불참석,미정
async function postWeddingAttendList(radioButtonValue, guestToken) {
  try {
    const res = await HttpClient.post(
      `invitation/weddingHall/attendance`,
      {
        attend: radioButtonValue,
      },
      {
        headers: {
          "Guest-Info": `${guestToken}`,
        },
      }
    );
    const data = res.data;
    return data;
  } catch (e) {
    console.error(e);
  }
}

export { getInforMationList, postWeddingAttendList, getWeddingAttendList };
