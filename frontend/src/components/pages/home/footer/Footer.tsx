import { FooterProps } from './types';
import styles from './Footer.module.css';

export const Footer = ({ children }: FooterProps) => {
  return <footer className={styles.footer}>{children}</footer>;
};
