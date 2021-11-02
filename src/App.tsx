import React from 'react';
import { css } from '@emotion/css';
import Header from './components/Header';
import MainContent from './components/MainContent';

const AppStyle = css``;

const App = () => {
  return (
    <div className={AppStyle}>
      <Header />
      <MainContent />
    </div>
  );
};

export default App;
