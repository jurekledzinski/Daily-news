import { GridStackNode } from 'gridstack';

export const getLocalData = <T>(name: string, type: 'array' | 'string' | 'object' = 'array') => {
  const constructor = { array: '[]', string: '""', object: '{}' }[type];
  const tempData = localStorage.getItem(name) ?? constructor;
  const localData: T = JSON.parse(tempData);
  return localData;
};

export const getCurrentCategory = <T extends GridStackNode>(category: string) => {
  return getLocalData<T[]>('categories').find((i) => i.id === category);
};

export const removeLocalData = (key: string) => {
  localStorage.removeItem(key);
};

export const setLocalData = <T>(name: string, data: T) => {
  localStorage.setItem(name, JSON.stringify(data));
};
