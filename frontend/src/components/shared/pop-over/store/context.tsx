import { createContext } from 'react';
import { ContextPopover } from './types';

export const PopoverContext = createContext<ContextPopover | undefined>(undefined);
