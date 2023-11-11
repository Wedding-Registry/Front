export function setUUidToken(uuidFrist, uuidSecond) {
  localStorage.setItem("uuidFrist", uuidFrist);
  localStorage.setItem("uuidSecond", uuidSecond);
}

export function getUuidFristToken() {
  return localStorage.getItem("uuidFrist");
}

export function getUuidSecoundToken() {
  return localStorage.getItem("uuidSecond");
}

export function removeUuidToken() {
  return localStorage.clear();
}
