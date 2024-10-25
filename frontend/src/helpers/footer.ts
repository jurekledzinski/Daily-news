import { PathMatch } from 'react-router-dom';

type GetFooterClass = {
  category: string | undefined;
  match: PathMatch<string> | null;
  isSubTabs: boolean;
};

export const getFooterClass = ({
  match,
  category,
  isSubTabs,
}: GetFooterClass) => {
  if (!match && category && isSubTabs) {
    return 'footer footer--sub-tabs';
  } else if (match) {
    return 'footer';
  } else {
    return 'footer footer--top-tabs';
  }
};
