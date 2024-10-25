import { useEffect } from 'react';

export type UseScrollToggleProps = {
  onChangeVisible: (
    value: 'visible' | 'half-visible' | 'not-visible' | 'not-visible-initial'
  ) => void;
  root?: IntersectionObserverInit['root'];
  rootMargin?: IntersectionObserverInit['rootMargin'];
  target: React.MutableRefObject<HTMLDivElement | null>;
  threshold?: IntersectionObserverInit['threshold'];
};

export const useScrollToggle = ({
  target,
  onChangeVisible,
  root = null,
  rootMargin = '0px',
  threshold = 0,
}: UseScrollToggleProps) => {
  useEffect(() => {
    if (!target.current) return;

    const optionsObserver = {
      root,
      rootMargin,
      threshold,
    };

    const handleObserve = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (!threshold) return;
        if (Array.isArray(threshold) && !threshold.length) return;

        const ratio = Math.ceil(entry.intersectionRatio * 2) / 2;

        // 1 - visible
        // 0.5 - half-visible
        // 0 - not-visible

        if (entry.isIntersecting && ratio === 1) {
          onChangeVisible('visible'); //true
        } else if (ratio === 0.5) {
          onChangeVisible('half-visible'); //false
        } else if (ratio === 0) {
          onChangeVisible('not-visible-initial'); //null
          setTimeout(() => {
            onChangeVisible('not-visible');
          }, 180);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserve, optionsObserver);
    observer.observe(target.current);

    const copyTarget = target.current;

    return () => {
      return observer.unobserve(copyTarget);
    };
  }, [onChangeVisible, root, rootMargin, target, threshold]);
};
