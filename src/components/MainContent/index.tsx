import React from 'react';
import { css } from '@emotion/css';
import PrefectureCheckBoxes from './PrefectureCheckBoxes';
import PopulationChart from './PopulationChart';

const MainContentStyle = css`
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
`;

const MainContent = () => {
  return (
    <div className={MainContentStyle}>
      <PrefectureCheckBoxes />
      <PopulationChart />
    </div>
  );
};

export default MainContent;
