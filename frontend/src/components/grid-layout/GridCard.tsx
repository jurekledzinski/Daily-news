import { forwardRef, Ref } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { LayoutItem } from '../../types';
import './GridCard.css';

type GridCardProps = {
  children?: React.ReactNode;
  className: string;
  gridItem: LayoutItem;
  onClick: (value: string) => void;
};

export const GridCard = forwardRef<HTMLDivElement, GridCardProps>(
  ({ gridItem, onClick, children, ...props }, ref: Ref<HTMLDivElement>) => {
    return (
      <div
        ref={ref}
        data-grid={gridItem.ui}
        onClick={() => onClick(gridItem.id ?? '')}
        {...props}
      >
        <span
          className={'grid-card__handle'}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <FontAwesomeIcon icon={faGripVertical} />
        </span>
        <h6>{gridItem.title}</h6>
        {children}
      </div>
    );
  }
);
