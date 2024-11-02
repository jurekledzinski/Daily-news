import { faGripVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef, Ref } from 'react';
import { GridCardProps } from './types';
import './GridCard.css';
import { Image } from '../../../shared';

export const GridCard = forwardRef<HTMLDivElement, GridCardProps>(
  (
    { gridItem, onClick, onRemove, children, ...props },
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        data-grid={gridItem.ui}
        onClick={() => {
          if (!gridItem.id) return;
          onClick(gridItem.id);
        }}
        {...props}
      >
        <header className="grid-card__header">
          <button
            className={'grid-card__handle'}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <FontAwesomeIcon icon={faGripVertical} />
          </button>
          <button
            className="grid-card__remove"
            onClick={(e) => {
              e.stopPropagation();
              if (!gridItem.id) return;
              onRemove(gridItem.id);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </header>

        <h6 className="grid-card__title">{gridItem.title}</h6>
        {children}
        <Image
          className="grid-card__image"
          src={gridItem.image}
          altText={gridItem.title}
        />
      </div>
    );
  }
);
