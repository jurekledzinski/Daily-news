import { Icon, Loader } from '@components/shared';
import { IconButtonContentProps } from './types';

export const IconButtonContent = ({ icon, isLoading, size }: IconButtonContentProps) => {
  return (
    <>
      {isLoading ? (
        <>
          <Loader position="element" size={size} />
          <Icon icon={icon[0]} size="1x" />
        </>
      ) : (
        <>{icon ? <Icon icon={icon[0]} size="1x" /> : null}</>
      )}
    </>
  );
};
