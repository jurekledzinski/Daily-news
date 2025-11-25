import { ContextControlLayout } from './types';
import { createContext } from 'react';

export const ControlLayoutContext = createContext<ContextControlLayout | undefined>(undefined);
