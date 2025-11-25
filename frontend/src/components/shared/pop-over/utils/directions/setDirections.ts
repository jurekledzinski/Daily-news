import { getNumericValue } from '../helpers';
import { SetBottom, SetLeft, SetRight, SetTop } from './types';

export const setTop: SetTop = ({ alignment, autoWidth, panelRect, triggerRect }) => {
  const triggerWidth = triggerRect.width;
  const panelWidth = panelRect.width;
  const panelHeight = panelRect.height;

  const top = {
    x: autoWidth ? triggerRect.x : triggerRect.x - panelWidth / 2 + triggerWidth / 2,
    y: triggerRect.y + window.scrollY - panelHeight,
    w: autoWidth ? triggerWidth : panelWidth,
  };

  if (alignment === 'start') {
    top.x = triggerRect.x;
  }

  if (alignment === 'end') {
    top.x = autoWidth ? triggerRect.x : triggerRect.x - panelWidth + triggerWidth;
  }

  return top;
};

export const setBottom: SetBottom = ({ alignment, autoWidth, panelRect, triggerRect }) => {
  const triggerWidth = triggerRect.width;
  const triggerHeight = triggerRect.height;
  const panelWidth = panelRect.width;

  const bottom = {
    x: autoWidth ? triggerRect.x : triggerRect.x - panelWidth / 2 + triggerWidth / 2,
    y: triggerRect.y + triggerHeight + window.scrollY,
    w: autoWidth ? triggerWidth : panelWidth,
  };

  if (alignment === 'start') {
    bottom.x = triggerRect.x;
  }

  if (alignment === 'end') {
    bottom.x = autoWidth ? triggerRect.x : triggerRect.x - panelWidth + triggerWidth;
  }

  return bottom;
};

export const setLeft: SetLeft = ({ alignment, autoWidth, panelStyle, panelRect, triggerRect }) => {
  const triggerHeight = triggerRect.height;
  const panelWidth = autoWidth ? triggerRect.width : panelRect.width;
  const panelHeight = panelRect.height;
  const paddingLeft = getNumericValue(panelStyle.paddingLeft);

  const left = {
    x: triggerRect.x - panelWidth - paddingLeft,
    y: triggerRect.y + window.scrollY + triggerHeight / 2 - panelHeight / 2,
    w: panelWidth,
  };

  if (alignment === 'start') {
    left.y = triggerRect.y + window.scrollY;
  }

  if (alignment === 'end') {
    left.y = triggerRect.bottom + window.scrollY - panelHeight;
  }

  return left;
};

export const setRight: SetRight = ({
  alignment,
  autoWidth,
  panelStyle,
  panelRect,
  triggerRect,
}) => {
  const triggerHeight = triggerRect.height;
  const panelWidth = autoWidth ? triggerRect.width : panelRect.width;
  const panelHeight = panelRect.height;
  const paddingRight = getNumericValue(panelStyle.paddingRight);

  const right = {
    x: triggerRect.x + panelWidth + paddingRight,
    y: triggerRect.y + window.scrollY + triggerHeight / 2 - panelHeight / 2,
    w: panelWidth,
  };

  if (alignment === 'start') {
    right.y = triggerRect.y + window.scrollY;
  }

  if (alignment === 'end') {
    right.y = triggerRect.bottom + window.scrollY - panelHeight;
  }

  return right;
};
