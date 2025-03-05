import {useMemo} from 'react';

const useDataMap = <T, K extends keyof T> (
  data: T[],
  key: K,
) => {
  return useMemo(() => new Map(
    data.map(item => [item[key], item])), [data, key]);
};

export default useDataMap;