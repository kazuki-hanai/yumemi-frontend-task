import React from "../../_snowpack/pkg/react.js";
import {css} from "../../_snowpack/pkg/@emotion/css.js";
const HeaderStyle = css`
  text-align: center;
  padding: 1rem;
  font-size: 1.5rem;
  background-color: #c4c4c4;
`;
const Header = () => {
  return /* @__PURE__ */ React.createElement("div", {
    className: HeaderStyle
  }, "Yumemi Frontend Task");
};
export default Header;
