import { ButtonParams, LinkButtonParams } from './types';

export const formatProps = ({
  className,
  color,
  disabled,
  fullWidth,
  isLoading,
  size,
  variant,
  ...rest
}: ButtonParams | LinkButtonParams) => {
  const button = { className, color, disabled, isLoading, fullWidth, size, variant };
  return { button, rest };
};
