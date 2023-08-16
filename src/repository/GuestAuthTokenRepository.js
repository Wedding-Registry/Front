const guestToken = "Guest-Info";

export function setGuestToken(accessToken) {
  localStorage.setItem("accessToken", accessToken);
}

export function getGuestToken() {
  return localStorage.getItem(guestToken);
}

export function removeGuestToken() {
  return localStorage.clear();
}

export function hasGuestToken() {
  return getGuestToken() !== undefined && getGuestToken() !== null;
}
