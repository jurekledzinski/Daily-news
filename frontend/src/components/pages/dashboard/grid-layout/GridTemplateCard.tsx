import { GridTemplateCardProps } from './types';
import './GridTemplateCard.css';

export const GridTemplateCard = ({
  data,
  isDisabled,
}: GridTemplateCardProps) => {
  return (
    <div
      className={
        isDisabled
          ? `grid-template-card grid-template-card--disabled`
          : 'grid-template-card'
      }
      draggable={true}
      onDragStart={(e) => {
        if (isDisabled) e.preventDefault();

        e.dataTransfer.setData('text/plain', `${JSON.stringify(data)}`);
      }}
      //   onTouchStart={(e: React.TouchEvent) => {
      //     console.log('touch start', e);
      //   }}
      unselectable="on"
    >
      <h6>{data.title}</h6>
    </div>
  );
};
