import { UserPasswordFormValues, UserProfileFormValues } from '../hooks';
import { Validate } from 'react-hook-form';

export const passwordRules: Record<string, Validate<string, UserPasswordFormValues>> = {
  hasNoSpace: (v) => /^\S*$/.test(v) || 'Must not contain spaces',
  hasNumber: (v) => /\d/.test(v) || 'Must include at least one number',
  hasUppercase: (v) => /[A-Z]/.test(v) || 'Must include at least one uppercase letter',
  hasLowercase: (v) => /[a-z]/.test(v) || 'Must include at least one lowercase letter',
  hasSpecial: (v) => /[@#!]/.test(v) || 'Must include at least one special character: @#!',
  minLength: (v) => v.length >= 8 || 'Password must be at least 8 characters',
};

export const confirmPasswordRules: Record<string, Validate<string | undefined, UserPasswordFormValues>> = {
  sameValues: (_, rest) => rest.password === rest.confirmPassword || 'Passwords do not match',
};

export const emailRules: Record<string, Validate<string, UserProfileFormValues>> = {
  matchPattern: (v) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email address must be a valid address',
};
