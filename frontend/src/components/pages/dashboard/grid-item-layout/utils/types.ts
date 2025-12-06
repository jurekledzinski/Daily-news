type Params = {
  id: string;
};

export type GridItemLayoutClassNames = (params: Params) => {
  gridItemLayout: string;
  header: string;
  title: string;
  subTitle: string;
  removeButton: string | undefined;
  footer: string;
  redirectButton: string;
  gripHandle: string | undefined;
};
