import { ActionData } from '../../types';
import { AlertError, Modal } from '../../components/shared';
import { Form, useActionData } from 'react-router-dom';
import { useChangePassword } from '../../hooks/useChangePassword';
import {
  useDeleteUserAccount,
  useFetchProtection,
  useUpdateUserProfile,
} from '../../hooks';
import { useUserStore } from '../../store';
import './Profile.css';
import {
  UpdateProfileForm,
  ChangePasswordForm,
} from '../../components/pages/profile';

export const Profile = () => {
  const actionData = useActionData() as ActionData;
  const { state } = useUserStore();
  const data = useFetchProtection();
  const token = data?.data?.token ?? '';
  const submitDeleteUser = useDeleteUserAccount({ token });
  const submitUpdateUser = useUpdateUserProfile({ initialData: state, token });
  const submitChangePassword = useChangePassword({ token });

  return (
    <div className="profile">
      <UpdateProfileForm
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
        className="delete-account-modal"
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
          <p>Are you sure you want delete your account?</p>
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
