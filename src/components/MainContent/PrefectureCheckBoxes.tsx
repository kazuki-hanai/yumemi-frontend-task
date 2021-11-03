import React from 'react';
import { css } from '@emotion/css';
import usePrefectures from '../../hooks/usePrefectures';

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
  const endpoint = 'http://localhost:8090';
  const prefectures = usePrefectures(endpoint);

  const CheckBoxes = [];
  for (const prefecture of prefectures) {
    CheckBoxes.push(
      <li className={PrefectureListStyle}>
        <label htmlFor={`prefecture-${prefecture.prefCode}`}>
          {prefecture.prefName}
          <input
            type="checkbox"
            id={`prefecture-${prefecture.prefCode}`}
            value={prefecture.prefCode}
          />
        </label>
      </li>,
    );
  }
  return (
    <div className={PrefectureCheckBoxesStyle}>
      <ul className={PrefectureUlStyle}>{CheckBoxes}</ul>
    </div>
  );
};

export default PrefectureCheckBoxes;
