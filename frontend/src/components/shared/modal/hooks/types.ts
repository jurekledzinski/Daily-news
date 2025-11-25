export type UseModalEffectStatusProps = Partial<{
  open: boolean;
  isPending: boolean;
  isSuccess: boolean;
  onFailed: () => void;
  onSuccess: () => void;
}>;

export type UseControlModalProps = UseModalEffectStatusProps;
