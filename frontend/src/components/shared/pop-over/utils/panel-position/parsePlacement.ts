import { ParsePlacement } from './types';

export const parsePlacement: ParsePlacement = (placement, dynamic) => {
  const currentPlacement = dynamic ?? placement;
  const mainDirection = dynamic?.split(' ')[0] ?? placement.split(' ')[0];
  const alignment = dynamic?.split(' ')[1] ?? placement?.split(' ')[1];

  return { currentPlacement, mainDirection, alignment };
};
