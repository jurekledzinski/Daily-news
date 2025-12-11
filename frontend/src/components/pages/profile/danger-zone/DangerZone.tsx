import styles from './DangerZone.module.css';
import { Box, Button, ButtonGroup, Heading, Modal, ModalLayout, useControlModal } from '@components/shared';
import { DangerZoneProps } from './types';
import { useDeleteAccountCallbacks } from '../hooks';
import { useUserDelete } from '../hooks/user-delete/useUserDelete';

export const DangerZone = ({ token }: DangerZoneProps) => {
  const { isOpen, onClose, onOpen } = useControlModal({});
  const { failedDelete, successDelete } = useDeleteAccountCallbacks();
  const { onSubmit, status } = useUserDelete({ onFailed: failedDelete, onSuccess: successDelete, token });

  return (
    <Box className={styles.dropZone}>
      <Heading className={styles.title} level={6}>
        Danger Zone
      </Heading>
      <p className={styles.textTitle}>Permanently delete your account and associated data</p>
      <Heading className={styles.subTitle} level={5}>
        Delete Account
      </Heading>
      <p className={styles.textSubTitle}>This action cannot be undone</p>
      <Modal className={styles.modalElement} open={isOpen}>
        <ModalLayout
          confirmText="Delete account"
          color="negative"
          isPending={status === 'submitting'}
          onCancel={onClose}
          onClose={onClose}
          onConfirm={onSubmit}
          title="Delete Account"
          variant="contained"
        >
          <Heading className="mb-xs" level={5}>
            This action is permanent and cannot be undone.
          </Heading>
          <p className={styles.text}>Are You Sure You Want to Delete Your Account?</p>
        </ModalLayout>
      </Modal>
      <ButtonGroup className="mt-sm" justify="justify-end" fullWidth>
        <Button
          className="r-xs"
          color="negative"
          label="Delete account"
          onClick={onOpen}
          size="size-xs"
          type="button"
        />
      </ButtonGroup>
    </Box>
  );
};
