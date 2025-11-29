import styles from '../Alert.module.css';
import { AlertButton } from '../components';
import { Children, isValidElement, useState } from 'react';
import { UseAlertProps } from './types';

export const useAlert = ({ children }: UseAlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const arrayChildren = Children.toArray(children);

  if (!isVisible) return null;

  return (
    <>
      {arrayChildren.map((child, index) => {
        if (isValidElement(child) && child.type === AlertButton) {
          return (
            <div
              key={index}
              className={styles.wrapperIconClose}
              onClick={() => setIsVisible(false)}
            >
              {child}
            </div>
          );
        }
        return child;
      })}
    </>
  );
};
