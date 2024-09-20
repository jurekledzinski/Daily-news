import React, { useState } from 'react';
import { GridCard } from './GridCard';
import { GridLayoutProps } from './types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useControlDashboard } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';
import './GridLayout.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import type ReactGridLayout from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const GridLayout = ({ data, setData }: GridLayoutProps) => {
  const gridCardRef = React.useRef<HTMLDivElement>(null);
  const [currentBreakPoint, setCurrentBreakPoint] = useState('lg');
  const navigate = useNavigate();

  const {
    handleBreakPointChange,
    handleDrop,
    handleDropStop,
    handleResizeStop,
  } = useControlDashboard({
    currentBreakPoint,
    data,
    onChangeBreakpoint: (breakpoint) => {
      setCurrentBreakPoint(breakpoint);
    },
    onDrop: (newLayouts) => {
      setData(newLayouts);
    },
    onDropStop: (newLayouts) => {
      setData(newLayouts);
    },
    onResizeStop: (newLayouts) => {
      setData(newLayouts);
    },
  });

  return (
    <ResponsiveGridLayout
      breakpoints={{
        lg: 1200 - 266,
        md: 996 - 266,
        sm: 768 - 266,
        xs: 500 - 266,
      }}
      className="grid-layout"
      cols={{ lg: 4, md: 3, sm: 2, xs: 1 }}
      draggableHandle=".grid-card__handle"
      isDroppable={true}
      layouts={
        Object.fromEntries(
          Object.entries(data).map((layout) => [
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
      {data[currentBreakPoint as keyof typeof data].map((item) => {
        return (
          <GridCard
            className="grid-card"
            gridItem={item}
            key={item.ui.i}
            onClick={(value) => {
              navigate({ pathname: `categories/${value}/articles` });
            }}
            ref={gridCardRef}
          />
        );
      })}
    </ResponsiveGridLayout>
  );
};
