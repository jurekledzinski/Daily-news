import toast from 'react-hot-toast';

export const showSuccessToast = (message: string, autoClose?: number) => {
  toast.success(message, { ...(autoClose && { duration: autoClose }) });
};

export const showErrorToast = (message: string, autoClose?: number) => {
  toast.error(message, { ...(autoClose && { duration: autoClose }) });
};
