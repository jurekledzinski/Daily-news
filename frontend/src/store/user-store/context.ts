import { createContext } from 'react';
import { UserStoreContext } from './types';

export const ContextUser = createContext<UserStoreContext | undefined>(undefined);
