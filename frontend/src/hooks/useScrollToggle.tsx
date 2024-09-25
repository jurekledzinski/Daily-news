import { useEffect } from 'react';

export type UseScrollToggleProps = {
  target: React.MutableRefObject<HTMLDivElement | null>;
  onChangeVisible: (value: boolean) => void;
  root?: IntersectionObserverInit['root'];
  rootMargin?: IntersectionObserverInit['rootMargin'];
  threshold?: IntersectionObserverInit['threshold'];
};

export const useScrollToggle = ({
  target,
  onChangeVisible,
  root,
  rootMargin,
  threshold,
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

        const ratio = Math.round(entry.intersectionRatio * 2) / 2;

        if (entry.isIntersecting && ratio === 1) {
          onChangeVisible(true);
        } else {
          onChangeVisible(false);
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
