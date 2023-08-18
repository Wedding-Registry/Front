import { atom } from "recoil";

export const uuidState = atom({
  key: "uuidState",
  default: {
    uuidFirst: "",
    uuidSecond: "",
  },
});
