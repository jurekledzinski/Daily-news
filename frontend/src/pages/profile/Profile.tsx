import styles from './Profile.module.css';
import { ChangePassword, DangerZone, PersonalInformation } from '@components/pages';
import { Heading } from '@/components/shared';
import { useLoaderData } from 'react-router';

export const Profile = () => {
  const loader = useLoaderData<{ data: string; success: boolean }>();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Heading className={styles.heading} level={4}>
          Profile Settings
        </Heading>
        <p className={styles.text}>Manage your account information and preferences</p>
        <PersonalInformation token={loader.data} />
        <ChangePassword token={loader.data} />
        <DangerZone token={loader.data} />
      </div>
    </div>
  );
};
