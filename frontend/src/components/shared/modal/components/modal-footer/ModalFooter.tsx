import styles from './ModalFooter.module.css';
import { Button } from '@components/shared';
import { ModalFooterProps } from './types';

export const ModalFooter = ({
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  form,
  isPending,
  onCancel,
  onConfirm,
  type = 'button',
  color,
}: ModalFooterProps) => {
  return (
    <footer className={styles.footer}>
      <Button
        className="r-xs"
        color="secondary"
        label={cancelText!}
        onClick={onCancel}
        size="size-sm"
        variant="outlined"
      />

      <Button
        className="r-xs"
        color={color}
        form={form}
        isLoading={isPending}
        label={confirmText}
        onClick={onConfirm}
        size="size-sm"
        type={type}
        variant="contained"
      />
    </footer>
  );
};
