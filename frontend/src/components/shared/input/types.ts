import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { InputVariant, Size } from '@types';

export type BaseInputProps = {
  isError?: boolean;
  label?: string;
  name?: string;
  placeholder?: string;
  size?: Size;
  variant?: InputVariant;
};

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & BaseInputProps;

export type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> &
  BaseInputProps;
