import { useEffect } from 'react';
import { UseScrollToggleProps as useFetchOnScrollProps } from './useScrollToggle';

export const useFetchOnScroll = ({
  target,
  onChangeVisible,
  root = null,
  rootMargin = '0px',
  threshold = 0,
}: useFetchOnScrollProps) => {
  useEffect(() => {
    if (!target.current) return;

    const optionsObserver = {
      root,
      rootMargin,
      threshold,
    };

    const handleObserve = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onChangeVisible(true);
          observer.disconnect();
        }
      });
    };

    const observer = new IntersectionObserver(handleObserve, optionsObserver);
    observer.observe(target.current);

    return () => {
      return observer.disconnect();
    };
  }, [onChangeVisible, root, rootMargin, target, threshold]);
};
