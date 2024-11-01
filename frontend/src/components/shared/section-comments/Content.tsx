import { ContentProps } from './types';
import './SectionComments.css';

export const Content = ({ text }: ContentProps) => {
  return <div className="comment-panel__content">{text}</div>;
};
