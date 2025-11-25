import { ActionLoginUser, ActionRegisterUser } from './types';
import { formatDataToObject, queryInvalidate } from './helpers';
import { invalidateQueryClient, setResponse } from '@/helpers';
import { LoaderFunctionArgs } from 'react-router';
import { loginUser, logoutUser, registerUser } from '../api-calls';
import { queryClient } from '@/routes';
import { User } from '@models';

export const actionHome =
  () =>
  async ({ request }: LoaderFunctionArgs<unknown>) => {
    const data = await request.formData();
    const actionType = data.get('actionType');

    if (actionType === 'register-user') {
      return actionRegisterUser({ data });
    } else if (actionType === 'login-user') {
      return actionLoginUser({ data });
    } else if (actionType === 'logout-user') {
      return actionLogoutUser();
    }
  };

export const actionRegisterUser: ActionRegisterUser = async ({ data }) => {
  data.delete('actionType');
  const newUser = formatDataToObject<User>(data);
  const result = await registerUser(newUser);

  return setResponse('register-user', result, window.location.pathname);
};

export const actionLoginUser: ActionLoginUser = async ({ data }) => {
  data.delete('actionType');
  const user = formatDataToObject<Omit<User, 'id' | 'name'>>(data);
  const result = await loginUser(user);

  await invalidateQueryClient(queryClient, ['user']);

  return setResponse('login-user', result, window.location.pathname);
};

export const actionLogoutUser = async () => {
  const result = await logoutUser({});

  queryInvalidate(['user']);

  return setResponse('logout-user', result, window.location.pathname);
};
