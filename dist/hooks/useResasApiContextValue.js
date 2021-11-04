import {useEffect, useState} from "../../_snowpack/pkg/react.js";
import ENDPOINT from "../constant/endpoint.js";
const useResasApiContextValue = () => {
  const [prefectureMap, setPrefectureMap] = useState(new Map());
  const setSelectedPrefecture = async (prefCode, selected) => {
    const prefecture = prefectureMap.get(prefCode);
    if (prefecture === void 0) {
      return;
    }
    prefecture.selected = selected;
    setPrefectureMap((prev) => new Map([...prev, [prefCode, prefecture]]));
    if (selected) {
      await fetchPopulation(prefCode);
    }
    console.log(prefectureMap.get(prefCode));
  };
  const fetchPopulation = async (prefCode) => {
    const prefecture = prefectureMap.get(prefCode);
    if (prefecture === void 0) {
      return;
    }
    const rawPopulation = await fetch(`${ENDPOINT}/population/composition/perYear?prefCode=${prefCode}&cityCode=-`);
    const populationResponse = await rawPopulation.json();
    for (const composition of populationResponse.result.data) {
      if (composition.label === "総人口") {
        for (const population of composition.data) {
          prefecture.populations.set(population.year, population.value);
        }
        setPrefectureMap((prev) => new Map([...prev, [prefCode, prefecture]]));
      }
    }
  };
  const fetchPrefectures = async () => {
    const rawPrefectures = await fetch(`${ENDPOINT}/prefectures`);
    const prefecturesResponse = await rawPrefectures.json();
    const newPrefectureMap = new Map();
    for (const prefecture of prefecturesResponse.result) {
      if (prefecture.prefCode in prefectureMap) {
        newPrefectureMap.set(prefecture.prefCode, prefectureMap.get(prefecture.prefCode));
      } else {
        const newPrefecture = {
          prefCode: prefecture.prefCode,
          prefName: prefecture.prefName,
          selected: false,
          populations: new Map()
        };
        setPrefectureMap((prev) => new Map([...prev, [newPrefecture.prefCode, newPrefecture]]));
      }
    }
  };
  useEffect(() => {
    fetchPrefectures().then().catch((err) => {
      console.log(err);
    });
  }, []);
  return {
    prefectureMap,
    setSelectedPrefecture
  };
};
export default useResasApiContextValue;
