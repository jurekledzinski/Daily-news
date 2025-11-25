import { formatIconButtonProps } from './utils/helpers';
import { iconButtonClassNames } from '@components/shared';
import { IconButtonContent } from './components';
import { IconButtonProps, IconLinkButtonProps } from './types';

export const IconButton = ({ icon, ...props }: IconButtonProps | IconLinkButtonProps) => {
  const { button, rest } = formatIconButtonProps(props);
  const classNames = iconButtonClassNames(button);

  if ('href' in rest) {
    return (
      <a
        aria-label="Icon link button"
        role="link"
        className={classNames}
        {...(button.disabled || button.isLoading ? {} : { href: rest.href })}
        {...rest}
      >
        <IconButtonContent icon={icon} isLoading={button.isLoading} size={button.size} />
      </a>
    );
  }

  return (
    <button
      aria-label="Icon button"
      className={classNames}
      disabled={button.disabled || button.isLoading}
      {...rest}
    >
      <IconButtonContent icon={icon} isLoading={button.isLoading} size={button.size} />
    </button>
  );
};
