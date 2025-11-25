import { useCallback, useRef } from 'react';

export const useTriggerRefs = () => {
  const trigger = useRef<HTMLElement | null>(null);
  const triggerRects = useRef<DOMRect>();

  const setTrigger = useCallback((node: HTMLElement | null) => {
    if (node) {
      trigger.current = node;
      triggerRects.current = node.getBoundingClientRect();
    } else {
      trigger.current = null;
    }
  }, []);

  const getTriggerRect = () => triggerRects.current;

  const updateTriggerRect = () => {
    if (!trigger.current) return;

    triggerRects.current = trigger.current.getBoundingClientRect();
  };

  return {
    getTriggerRect,
    updateTriggerRect,
    setTrigger,
    trigger,
  };
};
