export type UseOutletContext = {
  footerRef: React.MutableRefObject<HTMLDivElement | null>;
  handleAddSubArticle: (value: { id: string; title: string }) => void;
};

export type UseScrollToggleProps = {
  target: React.MutableRefObject<HTMLDivElement | null>;
  onChangeVisible: (value: boolean) => void;
  root?: IntersectionObserverInit['root'];
  rootMargin?: IntersectionObserverInit['rootMargin'];
  threshold?: IntersectionObserverInit['threshold'];
};
