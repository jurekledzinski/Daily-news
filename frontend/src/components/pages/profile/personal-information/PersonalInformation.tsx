import styles from './PersonalInformation.module.css';
import { Box, Heading } from '@components/shared';
import { PersonalInformationProps } from './types';
import { useProfileCallbacks } from '../hooks';
import { UserProfileForm, useUserProfile } from '../forms';

export const PersonalInformation = ({ token }: PersonalInformationProps) => {
  const { failedUpdateProfile, state, successUpdateProfile } = useProfileCallbacks();
  const { user } = state;
  const form = useUserProfile({ onFailed: failedUpdateProfile, onSuccess: successUpdateProfile, token, user });

  return (
    <Box className={styles.personalInformation}>
      <Heading className={styles.title} level={5}>
        Personal Information
      </Heading>
      <p className={styles.subTitle}>Update your personal details and contact information</p>
      <UserProfileForm controls={form.methods} isPending={form.status === 'submitting'} onSubmit={form.onSubmit} />
    </Box>
  );
};
