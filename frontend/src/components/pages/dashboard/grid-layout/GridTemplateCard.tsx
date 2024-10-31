import { GridTemplateCardProps } from './types';
import './GridTemplateCard.css';

export const GridTemplateCard = ({
  data,
  isDisabled,
  onTouchStart,
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
      onTouchStart={() => onTouchStart(data)}
      unselectable="on"
    >
      <h6>{data.title}</h6>
    </div>
  );
};
