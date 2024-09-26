import DOMPurify from 'dompurify';
import { LocalData } from '../components/pages';

export const sanitizeContent = (content: string) => DOMPurify.sanitize(content);

export const getLocalData = () => {
  const tempData = localStorage.getItem('categories') ?? '[]';
  const localData: LocalData[] = JSON.parse(tempData);
  return localData;
};

export const getCurrentCategory = (category: string) => {
  return getLocalData().find((i) => i.id === category);
};

export const setLocalData = (data: unknown) => {
  localStorage.setItem('categories', JSON.stringify(data));
};
