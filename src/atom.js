import { atom } from "recoil";

const dataAtom = atom({
  key: "dataAtom",
  default: []
});

const dateAtom = atom({
  key: "dateAtom",
  default: {}
});
export { dataAtom };
export { dateAtom };