import { useEffect } from 'react';

type useFetchOnScrollProps = {
  onChangeVisible: (value: boolean) => void;
};

export const useFetchOnScroll = ({
  onChangeVisible,
}: useFetchOnScrollProps) => {
  useEffect(() => {
    const onScroll = () => {
      if (
        window.scrollY !== 0 &&
        Math.ceil(window.innerHeight + window.scrollY) >=
          document.body.scrollHeight
      ) {
        onChangeVisible(true);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onChangeVisible]);
};
