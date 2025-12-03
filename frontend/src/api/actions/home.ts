import { ActionFunctionData } from './types';
import { formatDataToObject } from './helpers';
import { loginUser, logoutUser, registerUser, setActionResponse } from '../api-calls';
import { User } from '@models';
import type { ActionFunction } from 'react-router';

export const actionHome: ActionFunction = async ({ request }) => {
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

export const actionRegisterUser: ActionFunctionData = async ({ data }) => {
  data.delete('actionType');
  const newUser = formatDataToObject<User>(data);
  const result = await registerUser(newUser);

  return setActionResponse('register-user', result);
};

export const actionLoginUser: ActionFunctionData = async ({ data }) => {
  data.delete('actionType');
  const user = formatDataToObject<Omit<User, 'id' | 'name'>>(data);
  const result = await loginUser(user);

  return setActionResponse('login-user', result);
};

export const actionLogoutUser = async () => {
  const result = await logoutUser({});

  return setActionResponse('logout-user', result);
};
