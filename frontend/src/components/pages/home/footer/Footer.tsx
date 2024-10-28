import './Footer.css';

type FooterProps = {
  children: React.ReactNode;
};

export const Footer = ({ children }: FooterProps) => {
  return <footer className="footer">{children}</footer>;
};
