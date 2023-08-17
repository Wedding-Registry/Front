import HttpClient from "../../apis/HttpClient";

//이름 계좌 시간 전체 조회
async function getWeddingHall() {
  try {
    const response = await HttpClient.get(`weddingHall/all`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

//신랑 이름 등록
async function addHusbandName(name) {
  try {
    const response = await HttpClient.post(`marriage/husband/name`, {
      name: name,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}
//신부 이름 등록
async function addWifeName(name) {
  try {
    const response = await HttpClient.post(`marriage/wife/name`, {
      name: name,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

//신부 계좌 등록
async function addWifeAccount(account, bank) {
  try {
    const response = await HttpClient.post(`marriage/wife/account`, {
      account: account,
      bank: bank,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}
//신랑 계좌 등록
async function addHusbandAccount(account, bank) {
  try {
    const response = await HttpClient.post(`marriage/husband/account`, {
      account: account,
      bank: bank,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

// 예식시간
async function addWeddingHallTime(date, time) {
  try {
    const response = await HttpClient.post(`weddingHall/time`, {
      date: date,
      time: time,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}
//예식장 주소 및 주소 변경
async function updateWeddingHallLocation(address) {
  try {
    const response = await HttpClient.post(`weddingHall/location`, {
      address: address,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

export {
  getWeddingHall,
  updateWeddingHallLocation,
  addHusbandName,
  addWifeName,
  addWifeAccount,
  addHusbandAccount,
  addWeddingHallTime,
};
