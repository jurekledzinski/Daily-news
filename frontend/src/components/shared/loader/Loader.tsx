import './Loader.css';

export const Loader = ({ ...props }) => {
  return (
    <div {...props} className={['loader', props.className].join(' ')}></div>
  );
};
