import { PathMatch } from 'react-router';

export type HeaderProps = {
  matchHome: PathMatch<string> | null;
  matchProfile: PathMatch<string> | null;
};
