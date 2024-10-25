import { GridCard } from './GridCard';
import { GridLayoutProps } from './types';
import { NoDataMessage } from '../../../shared';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useRef, useState } from 'react';
import './GridLayout.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {
  colsLayouts,
  useControlDashboard,
  breakpoints,
} from '../../../../hooks';

import type ReactGridLayout from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const GridLayout = ({
  layout,
  setLayout,
  onNavigate,
}: GridLayoutProps) => {
  const gridCardRef = useRef<HTMLDivElement>(null);
  const [currentBreakPoint, setCurrentBreakPoint] = useState('lg');

  const {
    handleBreakPointChange,
    handleDrop,
    handleDropStop,
    handleResizeStop,
    handleRemoveCard,
  } = useControlDashboard({
    currentBreakPoint,
    layoutData: layout,
    onChangeBreakpoint: (breakpoint) => setCurrentBreakPoint(breakpoint),
    onDrop: (newLayouts) => setLayout(newLayouts),
    onDropStop: (newLayouts) => setLayout(newLayouts),
    onResizeStop: (newLayouts) => setLayout(newLayouts),
    onRemoveCard: (newLayouts) => setLayout(newLayouts),
  });

  return (
    <div className="grid-layout-container">
      {!layout['lg'].length && (
        <NoDataMessage>
          <p>News dashboard is empty</p>
        </NoDataMessage>
      )}
      <ResponsiveGridLayout
        breakpoints={{
          ...breakpoints,
        }}
        className={
          !layout['lg'].length
            ? 'grid-layout grid-layout--transparent'
            : 'grid-layout'
        }
        cols={{ ...colsLayouts }}
        draggableHandle=".grid-card__handle"
        isDroppable={true}
        layouts={
          Object.fromEntries(
            Object.entries(layout).map((layout) => [
              layout[0],
              layout[1].map((i) => i.ui),
            ])
          ) as ReactGridLayout.Layouts
        }
        onDragStop={handleDropStop}
        onResizeStop={handleResizeStop}
        onDrop={handleDrop}
        onBreakpointChange={handleBreakPointChange}
        onDropDragOver={() => ({
          w: 1,
          h: 4,
          minH: 4,
          maxH: 8,
          minW: 1,
          maxW: 2,
        })}
        rowHeight={30}
      >
        {layout[currentBreakPoint as keyof typeof layout].map((item) => {
          return (
            <GridCard
              className="grid-card"
              gridItem={item}
              key={item.ui.i}
              onClick={(value) => onNavigate(value, item.page)}
              onRemove={handleRemoveCard}
              ref={gridCardRef}
            />
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
};
