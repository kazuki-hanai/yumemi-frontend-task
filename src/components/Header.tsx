import React from 'react';
import { css } from '@emotion/css';

const HeaderStyle = css`
  text-align: center;
  padding: 1rem;
  font-size: 1.5rem;
  background-color: #c4c4c4;
`;

const Header = () => {
  return <div className={HeaderStyle}>Yumemi Frontend Task</div>;
};

export default Header;
