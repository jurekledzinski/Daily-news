import styles from './Popover.module.css';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { PopoverProps } from './types';

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      children,
      className,
      classNames,
      open,
      mountOnEnter,
      onEnter,
      onEntered,
      onEntering,
      onExit,
      onExited,
      onExiting,
      timeout = 300,
      unmountOnExit = true,
      ...props
    },
    ref
  ) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => nodeRef.current!);

    return createPortal(
      <CSSTransition
        in={open}
        nodeRef={nodeRef}
        timeout={timeout}
        classNames={classNames ?? styles}
        unmountOnExit={unmountOnExit}
        onEnter={onEnter}
        onEntered={onEntered}
        onEntering={onEntering}
        onExit={onExit}
        onExited={onExited}
        onExiting={onExiting}
        mountOnEnter={mountOnEnter}
      >
        <div {...props} className={className ?? styles.popover} ref={nodeRef}>
          {children}
        </div>
      </CSSTransition>,
      document.body
    );
  }
);

Popover.displayName = 'Popover';
