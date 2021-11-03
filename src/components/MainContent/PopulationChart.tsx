import React, { useContext, useEffect, useState } from 'react';
import { css } from '@emotion/css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ResasApiContext } from '../../context/ResasApiContext';

const PopulationChartStyle = css`
  margin: 1rem 0;
`;

const PopulationChart = () => {
  const { prefectureMap } = useContext(ResasApiContext);
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
    title: {
      text: '都道府県の年別人口数',
    },
    yAxis: {
      title: {
        align: 'high',
        textAlign: 'right',
        offset: 0,
        rotation: 0,
        text: '人口数',
        y: -15,
        x: -10,
      },
    },
    xAxis: {
      title: {
        text: '年度',
      },
    },
    series: [{ type: 'line' }],
  });

  useEffect(() => {
    const series: Highcharts.SeriesLineOptions[] = [];
    for (const [, prefecture] of prefectureMap) {
      if (prefecture.selected === false) {
        continue;
      }
      const populations = [];
      for (const [year, value] of prefecture.populations) {
        populations.push({ x: year, y: value });
      }
      series.push({
        type: 'line',
        name: prefecture.prefName,
        data: populations,
      });
    }
    setChartOptions({ series });
  }, [prefectureMap]);

  return (
    <div className={PopulationChartStyle}>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default PopulationChart;
