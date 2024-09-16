import { forwardRef, Ref } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { LayoutItem } from '../../types';
import './GridCard.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

type GridCardProps = {
  children?: React.ReactNode;
  className: string;
  gridItem: LayoutItem;
  onClick: (value: string) => void;
};

export const GridCard = forwardRef<HTMLDivElement, GridCardProps>(
  ({ gridItem, onClick, children, ...props }, ref: Ref<HTMLDivElement>) => {
    const { id, ui, title } = gridItem;

    return (
      <div
        ref={ref}
        data-grid={ui}
        onClick={() => onClick(id ?? '')}
        {...props}
      >
        <span
          className={'grid-card__handle'}
          onClick={(e) => e.stopPropagation()}
          onDragEnd={() => {
            console.log('start');
          }}
        >
          <FontAwesomeIcon icon={faGripVertical} />
        </span>
        <h6>{title}</h6>
        {children}
      </div>
    );
  }
);
