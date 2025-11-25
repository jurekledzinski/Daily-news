import { Button, ButtonGroup } from '@components/shared';
import { LoginForm, ModalForm, RegisterForm, useAuthModals } from '@components/pages';
import { NavAuthProps } from './types';
import {
  faArrowLeft,
  faArrowRightFromBracket,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

export const NavAuth = ({ isLoggedIn, onLogout }: NavAuthProps) => {
  const { form, handleClose, handleOpenSignIn, handleOpenSignUp, isOpen, modalType } =
    useAuthModals();

  return (
    <ButtonGroup spacing="normal">
      {isLoggedIn && (
        <Button
          className="r-xs"
          color="info"
          iconEnd={[faArrowRightFromBracket]}
          label="Logout"
          onClick={onLogout}
          size="size-xs"
          type="button"
        />
      )}

      {!isLoggedIn && (
        <ModalForm
          form="loginForm"
          icon={faArrowLeft}
          label="Sign In"
          onClose={handleClose}
          onOpen={handleOpenSignIn}
          open={isOpen && modalType === 'login'}
          subTitle="Please enter your account details."
          title="Welcome back!"
        >
          <LoginForm
            controls={form.login.methods}
            isPending={false}
            onSubmit={form.login.onSubmit}
          />
        </ModalForm>
      )}

      {!isLoggedIn && (
        <ModalForm
          form="registerForm"
          icon={faUserPlus}
          label="Sign Up"
          onClose={handleClose}
          onOpen={handleOpenSignUp}
          open={isOpen && modalType === 'register'}
          subTitle="Enter your information below."
          title="Create your account!"
        >
          <RegisterForm
            controls={form.register.methods}
            isPending={false}
            onSubmit={form.register.onSubmit}
          />
        </ModalForm>
      )}
    </ButtonGroup>
  );
};
