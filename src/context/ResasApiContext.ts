import { createContext } from 'react';
import type { PrefectureMap } from '../@types/ResesApi';

export type ResasApiContextData = {
  prefectureMap: PrefectureMap;
  setSelectedPrefecture: (prefCode: number, selected: boolean) => Promise<void>;
};

const resasApiContextDefaultValue: ResasApiContextData = {
  prefectureMap: new Map(),
  setSelectedPrefecture: async () => {
    return;
  },
};

export const ResasApiContext = createContext<ResasApiContextData>(
  resasApiContextDefaultValue,
);
