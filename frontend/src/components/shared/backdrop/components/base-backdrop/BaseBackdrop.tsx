import styles from '../../Backdrop.module.css';
import { BaseBackdropProps } from './types';
import { classNames } from '@helpers';
import { CSSTransition } from 'react-transition-group';
import { forwardRef } from 'react';

export const BaseBackdrop = forwardRef<HTMLDivElement, BaseBackdropProps>(
  ({ open, timeout = 300, ...props }, ref) => {
    return (
      <CSSTransition nodeRef={ref} in={open} timeout={timeout} classNames={styles} unmountOnExit>
        <div
          {...props}
          ref={ref}
          className={classNames(props.className, styles.backdropElement)}
          style={props.style}
        />
      </CSSTransition>
    );
  }
);
