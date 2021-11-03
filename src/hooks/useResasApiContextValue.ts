import { useEffect, useState } from 'react';
import type { ResasApiContextData } from '../context/ResasApiContext';
import type {
  PopulationResponse,
  PrefectureMap,
  PrefectureResponse,
} from '../@types/ResesApi';
import ENDPOINT from '../constant/endpoint';

const useResasApiContextValue = (): ResasApiContextData => {
  const [prefectureMap, setPrefectureMap] = useState<PrefectureMap>(new Map());

  const setSelectedPrefecture = async (prefCode: number, selected: boolean) => {
    const prefecture = prefectureMap.get(prefCode);
    if (prefecture === undefined) {
      return;
    }
    prefecture.selected = selected;
    setPrefectureMap((prev) => new Map([...prev, [prefCode, prefecture]]));

    if (selected) {
      await fetchPopulation(prefCode);
    }
    console.log(prefectureMap.get(prefCode));
  };

  const fetchPopulation = async (prefCode: number) => {
    const prefecture = prefectureMap.get(prefCode);
    if (prefecture === undefined) {
      return;
    }

    const rawPopulation = await fetch(
      `${ENDPOINT}/population/composition/perYear?prefCode=${prefCode}&cityCode=-`,
    );
    const populationResponse: PopulationResponse = await rawPopulation.json();
    for (const composition of populationResponse.result.data) {
      if (composition.label === '総人口') {
        for (const population of composition.data) {
          prefecture.populations.set(population.year, population.value);
        }
        setPrefectureMap((prev) => new Map([...prev, [prefCode, prefecture]]));
      }
    }
  };

  const fetchPrefectures = async () => {
    const rawPrefectures = await fetch(`${ENDPOINT}/prefectures`);
    const prefecturesResponse: PrefectureResponse = await rawPrefectures.json();

    const newPrefectureMap = new Map();
    for (const prefecture of prefecturesResponse.result) {
      if (prefecture.prefCode in prefectureMap) {
        newPrefectureMap.set(
          prefecture.prefCode,
          prefectureMap.get(prefecture.prefCode),
        );
      } else {
        const newPrefecture = {
          prefCode: prefecture.prefCode,
          prefName: prefecture.prefName,
          selected: false,
          populations: new Map(),
        };
        setPrefectureMap(
          (prev) => new Map([...prev, [newPrefecture.prefCode, newPrefecture]]),
        );
      }
    }
  };

  useEffect(() => {
    fetchPrefectures()
      .then()
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  return {
    prefectureMap,
    setSelectedPrefecture,
  };
};

export default useResasApiContextValue;
