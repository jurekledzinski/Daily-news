import './Loader.css';

type BackdropProps = {
  children: React.ReactNode;
};

export const Backdrop = ({ children }: BackdropProps) => {
  return <div className="backdrop">{children}</div>;
};
