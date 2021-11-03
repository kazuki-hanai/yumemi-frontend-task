import { useEffect, useState } from 'react';
import type { Prefecture, PrefectureResponse } from '../@types/ResesApi';

const usePrefectures = (endpoint: string) => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

  const getPrefectures = async () => {
    const rawPrefectures = await fetch(`${endpoint}/prefectures`);
    const prefectures: PrefectureResponse = await rawPrefectures.json();
    console.log(prefectures);
    setPrefectures(prefectures.result);
  };

  useEffect(() => {
    getPrefectures()
      .then()
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  return prefectures;
};
export default usePrefectures;
