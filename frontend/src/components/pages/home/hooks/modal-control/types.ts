import { useLogin, useRegister } from '../../forms';

export type UseModalControlProps = {
  login: ReturnType<typeof useLogin>['methods'];
  register: ReturnType<typeof useRegister>['methods'];
};
