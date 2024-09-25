export type UseOutletContext = {
  footerRef: React.MutableRefObject<HTMLDivElement | null>;
  handleAddSubArticle: (value: { id: string; title: string }) => void;
};
