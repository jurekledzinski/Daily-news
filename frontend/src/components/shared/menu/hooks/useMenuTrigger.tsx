import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Popover, usePosition, useTriggerRefs } from '@components/shared';
import { useClickOutside } from '@hooks';
import { useMenuTriggerProps } from './types';

export const useMenuTrigger = ({ autoWidth = true, children }: useMenuTriggerProps) => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const { getTriggerRect, updateTriggerRect, setTrigger, trigger } = useTriggerRefs();

  const [menuTrigger, menu] = React.Children.toArray(children);

  useEffect(() => setTrigger(triggerRef.current), [setTrigger]);

  const { onSetPosition } = usePosition({
    autoWidth,
    open,
    panelRef,
    placement: 'bottom end',
    getTriggerRect,
    updateTriggerRect,
  });

  useClickOutside({
    onClick: useCallback(() => setOpen(false), []),
    onLoadRefs: useCallback(() => [trigger.current], [trigger]),
  });

  return (
    <>
      <div onClick={() => setOpen((prev) => !prev)} ref={triggerRef} style={{ width: 'fit-content' }}>
        {menuTrigger}
      </div>
      <Popover ref={panelRef} open={open} onEntering={() => onSetPosition(undefined, undefined, getTriggerRect())}>
        {menu}
      </Popover>
    </>
  );
};
