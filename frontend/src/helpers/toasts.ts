import { toast, ToastPosition } from 'react-toastify';

export const showSuccessToast = (
  message: string,
  position: ToastPosition | undefined,
  toastId?: string
) => toast.success(message, { position, ...(toastId && { toastId }) });
