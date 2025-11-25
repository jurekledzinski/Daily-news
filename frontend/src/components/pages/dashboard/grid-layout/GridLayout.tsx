import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.min.css';
import './GridLayout.css';

export const GridStackLayout = GridStack;

export const GridLayout = () => {
  return (
    <div className="grid-layout-container">
      <div className="grid-stack"></div>
    </div>
  );
};
