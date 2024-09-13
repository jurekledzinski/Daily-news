import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import type ReactGridLayout from 'react-grid-layout';
import { GridCard } from './GridCard';

import { Responsive, WidthProvider } from 'react-grid-layout';
import { useControlDashboard } from '../../hooks';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './GridLayout.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

import { LayoutData } from '../../types';

export const GridLayout = () => {
  //   const navigate = useNavigate();
  const gridCardRef = React.useRef<HTMLDivElement>(null);

  const [data, setData] = useState<LayoutData>({
    lg: [],
    md: [],
    sm: [],
    xs: [],
  });

  const [currentBreakPoint, setCurrentBreakPoint] = useState('lg');

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
    <div className="wrapper">
      <ResponsiveGridLayout
        breakpoints={{
          lg: 1200 - 266,
          md: 996 - 266,
          sm: 768 - 266,
          xs: 500 - 266,
        }}
        className="layout"
        cols={{ lg: 4, md: 3, sm: 2, xs: 1 }}
        draggableHandle=".handle"
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
        onDropDragOver={() => ({ w: 1, h: 4 })}
        rowHeight={30}
      >
        {data[currentBreakPoint as keyof typeof data].map((item, index) => {
          return (
            <GridCard
              className="box"
              gridItem={item}
              index={index}
              key={item.ui.i}
              onClick={(value) => {
                console.log('value grid card', value);
              }}
              ref={gridCardRef}
            />
          );
        })}
      </ResponsiveGridLayout>
      <div className="aside">
        <div
          className="template"
          draggable={true}
          unselectable="on"
          onDragStart={(e) => e.dataTransfer.setData('text/plain', '')}
          onTouchStart={(e: React.TouchEvent) => {
            console.log('touch start', e);
          }}
        >
          <h4 style={{ fontWeight: 900 }}>Science</h4>
        </div>
        <div
          className="template"
          draggable={true}
          unselectable="on"
          onDragStart={(e) => e.dataTransfer.setData('text/plain', '')}
          onTouchStart={(e: React.TouchEvent) => {
            console.log('touch start', e);
          }}
        >
          <h4 style={{ fontWeight: 900 }}>News</h4>
        </div>
        <div
          className="template"
          draggable={true}
          unselectable="on"
          onDragStart={(e) => e.dataTransfer.setData('text/plain', '')}
          onTouchStart={(e: React.TouchEvent) => {
            console.log('touch start', e);
          }}
        >
          <h4 style={{ fontWeight: 900 }}>Health</h4>
        </div>
        <div
          className="template"
          draggable={true}
          unselectable="on"
          onDragStart={(e) => e.dataTransfer.setData('text/plain', '')}
          onTouchStart={(e: React.TouchEvent) => {
            console.log('touch start', e);
          }}
        >
          <h4 style={{ fontWeight: 900 }}>Sport</h4>
        </div>
      </div>
    </div>
  );
};

// <div
//   key={item.ui.i}
//   className="box"
//   data-grid={item.ui}
//   onClick={() => {
//     navigate({ pathname: `categories/science/articles` });
//   }}
// >
//   <span className={'handle'}>
//     <TbGridDots />
//   </span>
//   <p>
//     {index} -- {item.ui.i.slice(0, 3)}
//   </p>
// </div>
