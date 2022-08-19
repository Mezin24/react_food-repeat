import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const Backdrop = () => <div className={classes.backdrop}></div>;

const Overlay = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

const portalEl = document.getElementById('overlay-root');

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalEl)}
      {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, portalEl)}
    </>
  );
};
export default Modal;
