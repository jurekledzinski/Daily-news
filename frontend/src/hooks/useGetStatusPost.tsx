import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

type UseGetStatusPostProps = {
  idToast: string;
};

export const useGetStatusPost = ({ idToast }: UseGetStatusPostProps) => {
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    toast.onChange((value) => {
      if (value.id !== idToast) return;

      if (value.status === 'added') {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    });
  }, [idToast]);

  return isDisabled;
};
