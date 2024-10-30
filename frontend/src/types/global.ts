export type UseOutletContext = {
  activeTabs: string[];
  handleAddSubArticle: (value: { id: string; title: string }) => void;
};

export type UseScrollToggleProps = {
  target: React.MutableRefObject<HTMLDivElement | null>;
  onChangeVisible: (value: boolean) => void;
  root?: IntersectionObserverInit['root'];
  rootMargin?: IntersectionObserverInit['rootMargin'];
  threshold?: IntersectionObserverInit['threshold'];
};

export type ActionData = {
  action: string;
  message: string;
  redirect: string;
};
