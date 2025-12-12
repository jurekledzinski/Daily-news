import { useEffect, useRef, useState } from 'react';

export const useTabsListSlide = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isTabslistVisible, setIsTablistVisible] = useState(true);

  useEffect(() => {
    if (!ref.current) return;

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        setIsTablistVisible((prev) => {
          if (prev !== entry.isIntersecting) return entry.isIntersecting;
          return prev;
        });
      });
    };

    const observer = new IntersectionObserver(handleIntersect, { root: null, threshold: 0 });
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return { isTabslistVisible, ref };
};
