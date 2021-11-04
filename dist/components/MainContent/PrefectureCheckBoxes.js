import React, {useContext} from "../../../_snowpack/pkg/react.js";
import {css} from "../../../_snowpack/pkg/@emotion/css.js";
import {ResasApiContext} from "../../context/ResasApiContext.js";
const PrefectureCheckBoxesStyle = css`
  width: 100%;
`;
const PrefectureUlStyle = css`
  list-style-type: none;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;
const PrefectureListStyle = css`
  white-space: nowrap;
`;
const PrefectureCheckBoxes = () => {
  const {prefectureMap, setSelectedPrefecture} = useContext(ResasApiContext);
  const handleCheckBox = async (event) => {
    const prefCode = event.target.value;
    const checked = event.target.checked;
    await setSelectedPrefecture(parseInt(prefCode), checked);
  };
  const CheckBoxes = [];
  for (const [prefCode, prefecture] of prefectureMap) {
    CheckBoxes.push(/* @__PURE__ */ React.createElement("li", {
      key: prefCode,
      className: PrefectureListStyle
    }, /* @__PURE__ */ React.createElement("label", {
      htmlFor: `prefecture-${prefCode}`
    }, prefecture.prefName, /* @__PURE__ */ React.createElement("input", {
      type: "checkbox",
      id: `prefecture-${prefCode}`,
      value: prefCode,
      onChange: handleCheckBox
    }))));
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: PrefectureCheckBoxesStyle
  }, /* @__PURE__ */ React.createElement("ul", {
    className: PrefectureUlStyle
  }, CheckBoxes));
};
export default PrefectureCheckBoxes;
