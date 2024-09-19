import './GridTemplateCard.css';
import { GridTemplateCardProps } from './types';

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

        const transferData = {
          id: data.id,
          title: data.webTitle,
        };

        e.dataTransfer.setData('text/plain', `${JSON.stringify(transferData)}`);
      }}
      onTouchStart={(e: React.TouchEvent) => {
        console.log('touch start', e);
      }}
      unselectable="on"
    >
      <h6>{data.webTitle}</h6>
    </div>
  );
};
