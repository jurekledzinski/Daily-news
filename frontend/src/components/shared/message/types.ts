import { Color } from '@types';

export type MessageProps = {
  children: React.ReactNode;
  color?: Omit<Color, 'primary' | 'white'>;
};
