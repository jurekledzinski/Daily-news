import { useContext } from 'react';
import { PopoverContext } from './context';

export const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context) throw new Error('Popover context not found!');
  return context;
};
