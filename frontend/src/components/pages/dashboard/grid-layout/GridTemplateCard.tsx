import { detectMobile } from '@helpers/index';
import { GridTemplateCardProps } from './types';
import { Image } from '@components/shared';
import './GridTemplateCard.css';

export const GridTemplateCard = ({
  data,
  image,
  isDisabled,
  onClick,
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

        e.dataTransfer.setData(
          'text/plain',
          `${JSON.stringify({ ...data, image })}`
        );
      }}
      onClick={(e) => {
        const isMobile = detectMobile();

        if (isDisabled || !isMobile) {
          e.preventDefault();
          return;
        }
        onClick({ ...data, image });
      }}
      unselectable="on"
    >
      <Image
        className="grid-template-card__image"
        src={`${image}&tr=w-170,h-100,c-at_least`}
        altText={data.title}
      />
      <h6 className="grid-template-card__title">{data.title}</h6>
    </div>
  );
};
