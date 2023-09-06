const token = "accessToken";

export function setAccessToken(refreshToken, accessToken) {
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("accessToken", accessToken);
}

export function getAccessToken() {
  return localStorage.getItem(token);
}

export function removeAccessToken() {
  return localStorage.clear();
}

export function hasAccessToken() {
  return getAccessToken() !== undefined && getAccessToken() !== null;
}
