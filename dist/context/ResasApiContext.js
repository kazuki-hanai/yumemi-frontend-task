import {createContext} from "../../_snowpack/pkg/react.js";
const resasApiContextDefaultValue = {
  prefectureMap: new Map(),
  setSelectedPrefecture: async () => {
    return;
  }
};
export const ResasApiContext = createContext(resasApiContextDefaultValue);
