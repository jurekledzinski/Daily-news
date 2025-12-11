import { ValidationBlockProps } from '../components';

type Params = Omit<ValidationBlockProps, 'label'>;

export type ValidationBlockClassNames = (params: Params) => string;
