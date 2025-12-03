import { ActionFunction, Params } from 'react-router';
import { ActionProfile } from './types';
import { changeUserPassword, deleteUserAccount, setActionResponse, updateUserProfile } from '../api-calls';
import { CSRFToken, User } from '@models';
import { formatDataToObject, queryInvalidate, queryRemove } from './helpers';

export const actionProfileUser: ActionFunction = async ({ params, request }) => {
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

const actionUpdateUserProfile: ActionProfile = async ({ data, id }) => {
  data.delete('actionType');
  const dataProfile = formatDataToObject<Omit<User, 'id' | 'password'>>(data);
  const result = await updateUserProfile({ id, body: dataProfile });

  queryRemove(['user']);

  return setActionResponse('update-profile', result);
};

const actionChangeUserPassword: ActionProfile = async ({ data, id }) => {
  data.delete('actionType');
  const dataPassword = formatDataToObject<Pick<User, 'password' | 'csrfToken'>>(data);
  const result = await changeUserPassword({ id, body: dataPassword });

  queryRemove(['user']);

  return setActionResponse('change-password', result);
};

const actionDeleteUserAccount: ActionProfile = async ({ data, id }) => {
  data.delete('actionType');
  const deleteData = formatDataToObject<CSRFToken>(data);
  const result = await deleteUserAccount({ id, token: deleteData.csrfToken });

  queryInvalidate(['user']);

  return setActionResponse('delete-user-account', result);
};
