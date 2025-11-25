import { IconButtonParams, IconLinkButtonParams } from './types';

export const formatIconButtonProps = ({
  className,
  color,
  disabled,
  fullWidth,
  isLoading,
  size,
  variant,
  contrast,
  ...rest
}: IconButtonParams | IconLinkButtonParams) => {
  const button = {
    className,
    color,
    contrast,
    disabled,
    isLoading,
    fullWidth,
    size,
    variant,
  };
  return { button, rest };
};
