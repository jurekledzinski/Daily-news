import { IconBaseButtonProps } from '../../types';

type PickKeys = 'icon' | 'isLoading' | 'size';

export type IconButtonContentProps = Pick<IconBaseButtonProps, PickKeys>;
