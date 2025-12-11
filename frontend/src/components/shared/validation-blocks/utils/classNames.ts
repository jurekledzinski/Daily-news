import styles from '../components/validation-block/ValidationBlock.module.css';
import { generateClassNames } from '@helpers';
import { ValidationBlockClassNames } from './types';

export const validationBlockClassNames: ValidationBlockClassNames = ({ color, isValid }) => {
  return generateClassNames(styles, { block: true, [color]: !!color, isValid: isValid });
};
