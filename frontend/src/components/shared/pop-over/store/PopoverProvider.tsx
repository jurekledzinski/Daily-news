import { PopoverContext } from './context';
import { PopoverProviderProps } from './types';
import { useClickOutside } from '@hooks';
import { useControlPopover, useTriggerRefs } from '../hooks';
import { useMemo } from 'react';

const PopoverProvider = ({ children }: PopoverProviderProps) => {
  const registerTrigger = useTriggerRefs();
  const controlPopover = useControlPopover();

  useClickOutside({
    onClick: () => controlPopover.onClose(),
    onLoadRefs: () => [registerTrigger.trigger.current],
  });

  const values = useMemo(
    () => ({
      ...registerTrigger,
      ...controlPopover,
    }),
    [controlPopover, registerTrigger]
  );

  return <PopoverContext.Provider value={values}>{children}</PopoverContext.Provider>;
};

export default PopoverProvider;
