import { changeUserPassword, deleteUserAccount, updateUserProfile } from '../api-calls';
import { CSRFToken, User } from '@models';
import { formatDataToObject, queryInvalidate, queryRemove, validateAction } from './helpers';
import { LoaderFunctionArgs, Params, redirect } from 'react-router';
import { showSuccessToast } from '@helpers';
import {
  ActionChangeUserPassword,
  ActionDeleteUserAccount,
  ActionUpdateUserProfile,
} from './types';

export const actionProfileUser = async ({ params, request }: LoaderFunctionArgs<unknown>) => {
  const { id } = params as Params;
  if (!id) return;
  const data = await request.formData();
  const actionType = data.get('actionType');

  if (actionType === 'update-profile') {
    return actionUpdateUserProfile({ data, id });
  } else if (actionType === 'change-password') {
    return actionChangeUserPassword({ data, id });
  } else if (actionType === 'delete-user-account') {
    return actionDeleteUserAccount({ data, id });
  }
};

const actionUpdateUserProfile: ActionUpdateUserProfile = async ({ data, id }) => {
  data.delete('actionType');
  const dataProfile = formatDataToObject<Omit<User, 'id' | 'password'>>(data);
  const result = await updateUserProfile({ id, body: dataProfile });

  queryRemove(['user']);
  queryInvalidate(['crsf-token']);

  validateAction(result, 'update-profile');

  showSuccessToast('Profile updated successfully!');

  return redirect(window.location.pathname);
};

const actionChangeUserPassword: ActionChangeUserPassword = async ({ data, id }) => {
  data.delete('actionType');
  const dataPassword = formatDataToObject<Pick<User, 'password' | 'csrfToken'>>(data);
  const result = await changeUserPassword({ id, body: dataPassword });

  queryRemove(['user']);
  queryInvalidate(['crsf-token']);

  validateAction(result, 'change-password');

  showSuccessToast('Password changed successfully!');

  return redirect(window.location.pathname);
};

const actionDeleteUserAccount: ActionDeleteUserAccount = async ({ data, id }) => {
  data.delete('actionType');
  const deleteData = formatDataToObject<CSRFToken>(data);
  const result = await deleteUserAccount({ id, token: deleteData.csrfToken });

  queryInvalidate(['user']);

  validateAction(result, 'delete-user-account');

  showSuccessToast('Your account has been successfully deleted.');

  return redirect('/');
};
