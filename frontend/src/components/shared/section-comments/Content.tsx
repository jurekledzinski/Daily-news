import { ContentProps } from './types';

const Content = ({ text }: ContentProps) => {
  return <div className="comment-panel__content">{text}</div>;
};

export default Content;
