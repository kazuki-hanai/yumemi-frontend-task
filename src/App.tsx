import React from 'react';
import { css } from '@emotion/css';
import Header from './components/Header';
import MainContent from './components/MainContent';
import { ResasApiContext } from './context/ResasApiContext';
import useResasApiContextValue from './hooks/useResasApiContextValue';

const AppStyle = css``;

const App = () => {
  const resasApiContextValue = useResasApiContextValue();

  return (
    <ResasApiContext.Provider value={resasApiContextValue}>
      <div className={AppStyle}>
        <Header />
        <MainContent />
      </div>
    </ResasApiContext.Provider>
  );
};

export default App;
