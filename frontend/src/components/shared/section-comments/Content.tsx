import { ContentProps } from './types';

export const Content = ({ text }: ContentProps) => {
  return <div className="comment-panel__content">{text}</div>;
};
