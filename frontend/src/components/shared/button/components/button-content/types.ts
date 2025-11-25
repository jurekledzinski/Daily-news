import { BaseButtonProps } from '../../types';

type PickKeys = 'isLoading' | 'iconEnd' | 'iconStart' | 'label' | 'size';

export type ButtonContentProps = Pick<BaseButtonProps, PickKeys>;
