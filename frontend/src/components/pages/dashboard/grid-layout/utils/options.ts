import type { Breakpoint, GridStackOptions } from 'gridstack';

export const breakpoints: Breakpoint[] = [
  { w: 10000, c: 4, layout: 'compact' },
  { w: 1400, c: 4, layout: 'compact' },
  { w: 996, c: 3, layout: 'compact' },
  { w: 768, c: 2, layout: 'compact' },
  { w: 500, c: 1, layout: 'compact' },
];

export const initialOptions: GridStackOptions = {
  cellHeight: 70,
  acceptWidgets: true,
  removable: '#trash',
  disableResize: true,
  float: false,
  marginLeft: 0,
  marginTop: 0,
  marginRight: 8,
  marginBottom: 8,
  columnOpts: {
    breakpoints,
    breakpointForWindow: true,
  },
  handle: '.grip-handle, .grip-handle *',
  lazyLoad: true,
};
