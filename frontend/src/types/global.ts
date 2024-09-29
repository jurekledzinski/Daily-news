export type UseOutletContext = {
  headerRef: React.MutableRefObject<HTMLDivElement | null>;
  footerRef: React.MutableRefObject<HTMLDivElement | null>;
  handleAddSubArticle: (value: { id: string; title: string }) => void;
  tabsListContainerRef: React.MutableRefObject<HTMLDivElement | null>;
};

export type UseScrollToggleProps = {
  target: React.MutableRefObject<HTMLDivElement | null>;
  onChangeVisible: (value: boolean) => void;
  root?: IntersectionObserverInit['root'];
  rootMargin?: IntersectionObserverInit['rootMargin'];
  threshold?: IntersectionObserverInit['threshold'];
};
