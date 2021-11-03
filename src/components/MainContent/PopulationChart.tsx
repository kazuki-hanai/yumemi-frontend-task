import React, { useContext, useEffect } from 'react';
import { css } from '@emotion/css';
import { ResasApiContext } from '../../context/ResasApiContext';

const PopulationChartStyle = css``;

const PopulationChart = () => {
  const { prefectureMap } = useContext(ResasApiContext);

  const list = [];
  for (const [prefCode, prefecture] of prefectureMap) {
    list.push(
      <div
        className={css`
          float: left;
        `}
      >
        {prefCode}: {prefecture.prefName},{' '}
        {prefecture.selected ? 'true' : 'false'}
      </div>,
    );
  }

  useEffect(() => {
    console.log('chart!');
  }, [prefectureMap]);

  return <div className={PopulationChartStyle}>{list}</div>;
};

export default PopulationChart;
