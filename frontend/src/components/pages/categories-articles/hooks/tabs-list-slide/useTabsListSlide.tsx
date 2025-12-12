import { useEffect, useRef, useState } from 'react';

export const useTabsListSlide = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isTabslistVisible, setIsTablistVisible] = useState(true);

  useEffect(() => {
    console.log('ref --->', ref.current);
    if (!ref.current) return;

    console.log('check --->');

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        console.log('isIntersecting', entry.isIntersecting);

        setIsTablistVisible((prev) => {
          console.log('prev', prev, entry.isIntersecting);
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
