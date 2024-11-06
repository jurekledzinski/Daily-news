import { PathMatch } from 'react-router-dom';

export type HeaderProps = {
  matchHome: PathMatch<string> | null;
  matchProfile: PathMatch<string> | null;
};
