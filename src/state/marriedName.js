import { atom } from "recoil";

export const marriedName = atom({
  key: "marriedName",
  default: {
    husband: "",
    wife: "",
  },
});
