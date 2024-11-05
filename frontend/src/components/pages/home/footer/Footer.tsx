import { FooterProps } from './types';
import './Footer.css';

export const Footer = ({ children }: FooterProps) => {
  return <footer className="footer">{children}</footer>;
};
