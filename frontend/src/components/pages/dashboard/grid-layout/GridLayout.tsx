import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.min.css';
import './GridLayout.css';
import { GridLayoutProps } from './types';

export const GridStackLayout = GridStack;

export const GridLayout = ({ children }: GridLayoutProps) => {
  return (
    <div className="grid-layout-container">
      <div className="grid-stack"></div>
      {children}
    </div>
  );
};
