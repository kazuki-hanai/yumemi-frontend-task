import React, {useContext, useEffect, useState} from "../../../_snowpack/pkg/react.js";
import {css} from "../../../_snowpack/pkg/@emotion/css.js";
import Highcharts from "../../../_snowpack/pkg/highcharts.js";
import HighchartsReact from "../../../_snowpack/pkg/highcharts-react-official.js";
import {ResasApiContext} from "../../context/ResasApiContext.js";
const PopulationChartStyle = css`
  margin: 1rem 0;
`;
const PopulationChart = () => {
  const {prefectureMap} = useContext(ResasApiContext);
  const [chartOptions, setChartOptions] = useState({
    title: {
      text: "都道府県の年別人口数"
    },
    yAxis: {
      title: {
        align: "high",
        textAlign: "right",
        offset: 0,
        rotation: 0,
        text: "人口数",
        y: -15,
        x: -10
      }
    },
    xAxis: {
      title: {
        text: "年度"
      }
    },
    series: [{type: "line"}]
  });
  useEffect(() => {
    const series = [];
    for (const [, prefecture] of prefectureMap) {
      if (prefecture.selected === false) {
        continue;
      }
      const populations = [];
      for (const [year, value] of prefecture.populations) {
        populations.push({x: year, y: value});
      }
      series.push({
        type: "line",
        name: prefecture.prefName,
        data: populations
      });
    }
    setChartOptions({series});
  }, [prefectureMap]);
  return /* @__PURE__ */ React.createElement("div", {
    className: PopulationChartStyle
  }, /* @__PURE__ */ React.createElement(HighchartsReact, {
    highcharts: Highcharts,
    options: chartOptions
  }));
};
export default PopulationChart;
