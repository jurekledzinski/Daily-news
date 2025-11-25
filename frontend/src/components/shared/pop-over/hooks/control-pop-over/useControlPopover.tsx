import { useState } from 'react';

export const useControlPopover = () => {
  const [open, setOpen] = useState(false);

  const onToggle = () => setOpen((prev) => !prev);

  const onClose = () => setOpen(false);

  return { open, onClose, onToggle };
};
