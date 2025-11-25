import { messageClassNames } from './utils/classNames';
import { MessageProps } from './types';

export const Message = ({ color = 'negative', children }: MessageProps) => {
  const classNames = messageClassNames(color);

  return (
    <p
      className={classNames}
      role={color === 'warning' || color === 'negative' ? 'alert' : 'status'}
    >
      {children}
    </p>
  );
};
