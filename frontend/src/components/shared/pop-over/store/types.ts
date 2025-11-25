export type ContextPopover = {
  getTriggerRect: () => DOMRect | undefined;
  onClose: () => void;
  onToggle: () => void;
  open: boolean;
  setTrigger: (node: HTMLElement | null) => void;
  trigger: React.MutableRefObject<HTMLElement | null>;
  updateTriggerRect: () => void;
};

export type PopoverProviderProps = {
  children: React.ReactNode;
};
