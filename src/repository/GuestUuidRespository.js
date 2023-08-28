export function setUUidToken(uuidFrist, uuidSecond) {
  localStorage.setItem("uuidFrist", uuidFrist);
  localStorage.setItem("uuidSecond", uuidSecond);
}

export function getUUid1Token() {
  return localStorage.getItem("uuidFrist");
}

export function getUUid2Token() {
  return localStorage.getItem("uuidSecond");
}

export function removeUUidToken() {
  return localStorage.clear();
}
