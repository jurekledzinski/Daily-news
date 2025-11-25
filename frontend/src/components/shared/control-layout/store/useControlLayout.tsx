import { ControlLayoutContext } from './contextControlLayout';
import { useContext } from 'react';

export const useControlLayout = () => {
  const context = useContext(ControlLayoutContext);
  if (!context) throw new Error('ControlLayout context not found!');
  return context;
};
