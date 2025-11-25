import { controlLayoutClassNames } from './utils';
import { ControlLayoutProps } from './types';
import { ControlLayoutProvider } from './store';
import { forwardRef, Ref } from 'react';

export const ControlLayout = forwardRef<HTMLDivElement, ControlLayoutProps>(
  ({ children, onClick, ...props }, ref: Ref<HTMLDivElement>) => {
    const classNames = controlLayoutClassNames(props);

    return (
      <ControlLayoutProvider value={props}>
        <div className={classNames} ref={ref} onClick={onClick}>
          {children}
        </div>
      </ControlLayoutProvider>
    );
  }
);

ControlLayout.displayName = 'ControlLayout';
