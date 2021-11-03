export type PrefectureMap = Map<number, Prefecture>;

export type Prefecture = {
  prefCode: number;
  prefName: string;
  selected: boolean;
  populations: Map<number, number>;
};

export type PrefectureResponse = {
  message: string;
  result: {
    prefCode: number;
    prefName: string;
  }[];
};

export type PopulationResponse = {
  boundaryYear: string;
  result: {
    data: {
      label: string;
      data: {
        year: number;
        value: number;
        rate: number | null;
      }[];
    }[];
  };
};
