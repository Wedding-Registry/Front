import { atom } from "recoil";

const initAuthState = {
    userId: null,
    userName: null,
    boardsId: null,
    accessToken: null,
    refreshToken: null,
    needMoreInfo: null
}
export const authStateAtom = atom({
    key: "authStateAtom",
    default: initAuthState,
});
export const authTokenAtom = atom({
    key: "authTokenAtom",
    default: {
        accessToken: localStorage.getItem('accessToken') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,

    }
})
