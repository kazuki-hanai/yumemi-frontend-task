import React from "../_snowpack/pkg/react.js";
import {css} from "../_snowpack/pkg/@emotion/css.js";
import Header from "./components/Header.js";
import MainContent from "./components/MainContent/index.js";
import {ResasApiContext} from "./context/ResasApiContext.js";
import useResasApiContextValue from "./hooks/useResasApiContextValue.js";
const AppStyle = css``;
const App = () => {
  const resasApiContextValue = useResasApiContextValue();
  return /* @__PURE__ */ React.createElement(ResasApiContext.Provider, {
    value: resasApiContextValue
  }, /* @__PURE__ */ React.createElement("div", {
    className: AppStyle
  }, /* @__PURE__ */ React.createElement(Header, null), /* @__PURE__ */ React.createElement(MainContent, null)));
};
export default App;
