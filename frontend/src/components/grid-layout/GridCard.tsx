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
  index: number;
  gridItem: LayoutItem;
  onClick: (value: string) => void;
};

export const GridCard = forwardRef<HTMLDivElement, GridCardProps>(
  (
    { index, gridItem, onClick, children, ...props },
    ref: Ref<HTMLDivElement>
  ) => {
    const { ui } = gridItem;

    return (
      <div
        ref={ref}
        data-grid={ui}
        onClick={() => onClick('science')}
        {...props}
      >
        <span className={'handle'} onClick={(e) => e.stopPropagation()}>
          <FontAwesomeIcon icon={faGripVertical} />
        </span>
        <p>
          {index} -- {ui.i.slice(0, 3)}
        </p>
        {children}
      </div>
    );
  }
);

// onClick={() => {
//     navigate({ pathname: `categories/science/articles` });
//   }}
