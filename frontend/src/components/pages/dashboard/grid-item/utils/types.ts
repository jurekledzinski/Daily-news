type Params = {
  gridItemIds: string[];
  id: string;
};

export type GridItemClassNames = (params: Params) => {
  gridItem: string | undefined;
  icon: string;
  image: string;
  grip: string;
  title: string;
  text: string;
};
