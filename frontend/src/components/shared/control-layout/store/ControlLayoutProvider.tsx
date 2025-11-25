import { ControlLayoutContext } from './contextControlLayout';
import { ControlLayoutProviderProps } from './types';
import { useMemo } from 'react';

export const ControlLayoutProvider = ({ children, value }: ControlLayoutProviderProps) => {
  const values = useMemo(() => value, [value]);

  return <ControlLayoutContext.Provider value={values}>{children}</ControlLayoutContext.Provider>;
};
