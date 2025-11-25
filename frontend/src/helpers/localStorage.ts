import { GridStackNode } from 'gridstack';

export const getLocalData = <T>(name: string) => {
  const tempData = localStorage.getItem(name) ?? '[]';
  const localData: T[] = JSON.parse(tempData);
  return localData;
};

export const getCurrentCategory = <T extends GridStackNode>(category: string) => {
  return getLocalData<T>('categories').find((i) => i.id === category);
};

export const setLocalData = <T>(name: string, data: T) => {
  localStorage.setItem(name, JSON.stringify(data));
};
