import { ActionData } from '@/types';
import { AlertError, Modal } from '@/components/shared';
import { ChangePasswordForm, UpdateProfileForm } from '@/components/pages';
import { Form, useActionData } from 'react-router-dom';
import { getCookie } from '@/helpers';
import { useFetchProtection, useGetStatusPost } from '@/hooks';
import { useUserStore } from '@/store';
import './Profile.css';

import {
  useChangePassword,
  useDeleteUserAccount,
  useUpdateUserProfile,
} from './hooks';

export const Profile = () => {
  const actionData = useActionData() as ActionData;
  const { state } = useUserStore();
  const isLoggedIn = getCookie('tsge');
  const dataToken = useFetchProtection({ isLoggedIn: Boolean(isLoggedIn) });
  const isDisabled = useGetStatusPost({ idToast: 'update-profile' });

  const submitDeleteUser = useDeleteUserAccount({
    token: dataToken.token,
  });

  const submitUpdateUser = useUpdateUserProfile({
    initialData: state,
    token: dataToken.token,
  });

  const submitChangePassword = useChangePassword({
    token: dataToken.token,
  });

  return (
    <div className="profile">
      <UpdateProfileForm
        isDisabled={isDisabled}
        methods={submitUpdateUser.methods}
        onSubmit={submitUpdateUser.onSubmit}
        {...(actionData && {
          serverError:
            actionData && actionData.action === 'update-profile'
              ? actionData.message
              : null,
        })}
      />
      <ChangePasswordForm
        methods={submitChangePassword.methods}
        onSubmit={submitChangePassword.onSubmit}
        {...(actionData && {
          serverError:
            actionData && actionData.action === 'change-password'
              ? actionData.message
              : null,
        })}
      />

      <Modal
        form="delete-user"
        className="modal--delete"
        confirmButton="Confirm"
        openButton="Delete account"
        title="Delete account confirmation"
      >
        <Form
          id="delete-user"
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            submitDeleteUser();
          }}
        >
          <p className="modal__text">
            Are you sure you want delete your account?
          </p>
        </Form>
      </Modal>

      {actionData && actionData.action === 'delete-user-account' && (
        <AlertError className="alert-error--profile">
          {actionData.message}
        </AlertError>
      )}
    </div>
  );
};
