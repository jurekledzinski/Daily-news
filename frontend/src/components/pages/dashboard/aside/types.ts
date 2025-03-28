import { Categories } from '@/api';
import { LayoutData } from '../grid-layout';

export type AsideProps = {
  layout: LayoutData;
  onClick: (data: Categories) => void;
};
