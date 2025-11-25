import { ContextTabs } from './types';
import { createContext } from 'react';

export const TabsContext = createContext<ContextTabs | undefined>(undefined);
