import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type ReactGridLayout from 'react-grid-layout';

import { Responsive, WidthProvider } from 'react-grid-layout';
import { TbGridDots } from 'react-icons/tb';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './GridLayout.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

import { LayoutData } from '../../types';
import { findPosition as findFirstAvailablePosition } from '../../helpers';

const colsLayouts = {
  lg: 4,
  md: 3,
  sm: 2,
  xs: 1,
};

export const GridLayout = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<LayoutData>({
    lg: [],
    md: [],
    sm: [],
    xs: [],
  });
  const [currentBreakPoint, setCurrentBreakPoint] = useState('lg');

  const handleBreakPointChange = (newBreakpoint: string) => {
    setCurrentBreakPoint(newBreakpoint);
  };

  const onDrop = (
    layout: ReactGridLayout.Layout[],
    newItem: ReactGridLayout.Layout
  ) => {
    const tempId = '__dropping-elem__';
    const newId = uuidv4();

    const item = {
      ...cloneDeep(newItem),
      i: newId,
    };

    const newLayouts = cloneDeep(data);

    const startY = item.y;

    const copy = cloneDeep(layout).map((item) => {
      if (item.i === tempId) {
        return { ui: { ...item, i: newId } };
      }
      return { ui: { ...item } };
    });

    for (const breakpoint in data) {
      if (breakpoint === currentBreakPoint) {
        newLayouts[breakpoint] = copy;
      } else {
        const position = findFirstAvailablePosition({
          data: newLayouts[breakpoint],
          cols: colsLayouts[breakpoint as keyof typeof colsLayouts],
          item,
          startY,
        });

        if (position) {
          item.x = position.x;
          item.y = position.y;
          newLayouts[breakpoint] = [
            ...newLayouts[breakpoint],
            { ui: { ...item } },
          ];
        }
      }
    }

    setData(newLayouts);
  };

  const handleDropStop = (layout: ReactGridLayout.Layout[]) => {
    setData((prev) => ({
      ...prev,
      [currentBreakPoint]: prev[currentBreakPoint].map((item) => {
        const sameItem = layout.find((el) => el.i === item.ui.i);

        if (sameItem) {
          return { ui: sameItem, id: sameItem.i };
        }

        return item;
      }),
    }));
  };

  const handleResizeStop = (layout: ReactGridLayout.Layout[]) => {
    setData((prev) => ({
      ...prev,
      [currentBreakPoint]: prev[currentBreakPoint].map((item) => {
        const sameItem = layout.find((el) => el.i === item.ui.i);

        if (sameItem) {
          return { ui: sameItem, id: sameItem.i };
        }

        return item;
      }),
    }));
  };

  return (
    <div className="wrapper">
      <ResponsiveGridLayout
        onDragStop={handleDropStop}
        onResizeStop={handleResizeStop}
        className="layout"
        layouts={
          Object.fromEntries(
            Object.entries(data).map((layout) => [
              layout[0],
              layout[1].map((i) => i.ui),
            ])
          ) as ReactGridLayout.Layouts
        }
        breakpoints={{
          lg: 1200 - 266,
          md: 996 - 266,
          sm: 768 - 266,
          xs: 500 - 266,
        }}
        cols={{ lg: 4, md: 3, sm: 2, xs: 1 }}
        rowHeight={30}
        onDrop={onDrop}
        onBreakpointChange={handleBreakPointChange}
        draggableHandle=".handle"
        isDroppable={true}
        onDropDragOver={() => ({ w: 1, h: 4 })}
      >
        {data[currentBreakPoint as keyof typeof data].map((item, index) => {
          return (
            <div
              key={item.ui.i}
              className="box"
              data-grid={item.ui}
              onClick={() => {
                navigate({ pathname: `categories/science/articles` });
              }}
            >
              <span className={'handle'}>
                <TbGridDots />
              </span>
              <p>
                {index} -- {item.ui.i.slice(0, 3)}
              </p>
            </div>
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
