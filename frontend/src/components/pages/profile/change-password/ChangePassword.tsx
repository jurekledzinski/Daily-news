import styles from './ChangePassword.module.css';
import { Box, Heading } from '@components/shared';
import { ChangePasswordProps } from './types';
import { usePasswordCallbacks } from '../hooks';
import { UserPasswordForm, useUserPassword } from '../forms';

export const ChangePassword = ({ token }: ChangePasswordProps) => {
  const { failedUpdatePassword, successUpdatePassword } = usePasswordCallbacks();
  const form = useUserPassword({ onFailed: failedUpdatePassword, onSuccess: successUpdatePassword, token });

  return (
    <Box className={styles.changePassword}>
      <Heading className={styles.title} level={6}>
        Change Password
      </Heading>
      <p className={styles.subTitle}>Ensure your account is using a strong password</p>
      <UserPasswordForm
        controls={form.methods}
        isPending={form.status === 'submitting'}
        onSubmit={form.onSubmit}
      />
    </Box>
  );
};
