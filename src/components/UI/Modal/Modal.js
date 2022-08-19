import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const Backdrop = (props) => (
  <div onClick={props.onClose} className={classes.backdrop}></div>
);

const Overlay = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

const portalEl = document.getElementById('overlay-root');

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalEl)}
      {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, portalEl)}
    </>
  );
};
export default Modal;
