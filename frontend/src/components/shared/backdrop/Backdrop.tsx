import { backdropCSSVariables } from './utils';
import { BackdropProps } from './types';
import { BaseBackdrop } from './components';
import { createPortal } from 'react-dom';
import { useRef } from 'react';

export const Backdrop = ({ duration, portal, zIndex, ...props }: BackdropProps) => {
  const nodeRef = useRef(null);
  const inlineVariables = backdropCSSVariables({ duration, zIndex });

  if (portal) {
    return createPortal(
      <BaseBackdrop ref={nodeRef} style={inlineVariables} {...props} />,
      document.body
    );
  }

  return <BaseBackdrop ref={nodeRef} style={inlineVariables} {...props} />;
};
