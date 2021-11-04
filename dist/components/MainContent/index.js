import React from "../../../_snowpack/pkg/react.js";
import {css} from "../../../_snowpack/pkg/@emotion/css.js";
import PrefectureCheckBoxes from "./PrefectureCheckBoxes.js";
import PopulationChart from "./PopulationChart.js";
const MainContentStyle = css`
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
`;
const MainContent = () => {
  return /* @__PURE__ */ React.createElement("div", {
    className: MainContentStyle
  }, /* @__PURE__ */ React.createElement(PrefectureCheckBoxes, null), /* @__PURE__ */ React.createElement(PopulationChart, null));
};
export default MainContent;
