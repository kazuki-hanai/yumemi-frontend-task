import { useEffect, useState } from 'react';
import type {
  PopulationResponse,
  PrefectureMap,
  PrefectureResponse,
} from '../@types/ResesApi';

const useResasApi = (endpoint: string) => {
  const [prefectureMap, setPrefectureMap] = useState<PrefectureMap>(new Map());

  const setSelectedPrefecture = async (prefCode: number, selected: boolean) => {
    const prefecture = prefectureMap.get(prefCode);
    if (prefecture === undefined) {
      return;
    }
    prefecture.selected = selected;
    prefectureMap.set(prefCode, prefecture);
    setPrefectureMap(prefectureMap);

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
      `${endpoint}/population/composition/perYear?prefCode=${prefCode}&cityCode=-`,
    );
    const populationResponse: PopulationResponse = await rawPopulation.json();
    for (const composition of populationResponse.result.data) {
      if (composition.label === '総人口') {
        for (const population of composition.data) {
          prefecture.populations.set(population.year, population.value);
        }
        prefectureMap.set(prefCode, prefecture);
      }
    }
  };

  const fetchPrefectures = async () => {
    const rawPrefectures = await fetch(`${endpoint}/prefectures`);
    const prefecturesResponse: PrefectureResponse = await rawPrefectures.json();

    const newPrefectureMap = new Map();
    for (const prefecture of prefecturesResponse.result) {
      if (prefecture.prefCode in prefectureMap) {
        newPrefectureMap.set(
          prefecture.prefCode,
          prefectureMap.get(prefecture.prefCode),
        );
      } else {
        newPrefectureMap.set(prefecture.prefCode, {
          prefCode: prefecture.prefCode,
          prefName: prefecture.prefName,
          selected: false,
          populations: new Map(),
        });
      }
    }
    setPrefectureMap(newPrefectureMap);
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

export default useResasApi;
