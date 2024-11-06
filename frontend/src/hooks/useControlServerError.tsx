import { useCallback, useMemo, useState } from 'react';
import { getCookie, removeCookie } from '@helpers/index';

export const useControlServerError = (cookieName: string) => {
  const [, setFlag] = useState(false);

  const onRemoveCookie = useCallback(() => {
    removeCookie(cookieName);
    setFlag((prev) => !prev);
  }, [cookieName]);

  const onGetCookie = useCallback(
    (action: string): { message: string; action: string } | null =>
      action && action === getCookie(cookieName)?.action
        ? getCookie(cookieName)
        : null,
    [cookieName]
  );

  return useMemo(
    () => ({
      onGetCookie,
      onRemoveCookie,
    }),
    [onGetCookie, onRemoveCookie]
  );
};
