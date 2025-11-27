import { getLocalData, removeLocalData, setLocalData } from '@helpers';

export const usePersistedScrollPage = () => {
  const saveInLocalstoragePage = (name: string, key: string, page: number) => {
    const localPages = getLocalData<Record<string, string>>(name, 'object');
    localPages[key] = String(page);
    setLocalData(name, localPages);
  };

  const filterInLocalstoragePage = (name: string, key: string) => {
    const localPages = getLocalData<Record<string, string>>(name, 'object');
    delete localPages[key];
    if (!Object.keys(localPages).length) return removeLocalData(name);
    setLocalData(name, localPages);
  };

  return { saveInLocalstoragePage, filterInLocalstoragePage };
};
