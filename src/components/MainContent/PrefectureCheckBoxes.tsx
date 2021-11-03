import React, { ChangeEvent } from 'react';
import { css } from '@emotion/css';
import useResasApi from '../../hooks/useResasApi';

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
  const { prefectureMap, setSelectedPrefecture } = useResasApi(endpoint);

  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    const prefCode = event.target.value;
    const checked = event.target.checked;
    setSelectedPrefecture(parseInt(prefCode), checked);
  };

  const CheckBoxes = [];
  for (const [prefCode, prefecture] of prefectureMap) {
    CheckBoxes.push(
      <li key={prefCode} className={PrefectureListStyle}>
        <label htmlFor={`prefecture-${prefCode}`}>
          {prefecture.prefName}
          <input
            type="checkbox"
            id={`prefecture-${prefCode}`}
            value={prefCode}
            onChange={handleCheckBox}
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
