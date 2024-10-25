import { getFooterClass } from '../../../../helpers';
import { PathMatch } from 'react-router-dom';
import './Footer.css';

type FooterProps = {
  category: string | undefined;
  children: React.ReactNode;
  matchHome: PathMatch<string> | null;
  matchProfile: PathMatch<string> | null;
  isSubTabs: boolean;
  className?: string;
};

export const Footer = ({
  category,
  children,
  isSubTabs,
  matchHome,
  matchProfile,
  className,
}: FooterProps) => {
  const footerClass = getFooterClass({
    match: matchHome || matchProfile,
    category,
    isSubTabs,
  });

  return (
    <footer className={[footerClass, className].filter(Boolean).join('')}>
      {children}
    </footer>
  );
};
