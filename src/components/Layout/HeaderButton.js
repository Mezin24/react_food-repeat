import { useContext, useState, useEffect } from 'react';

import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';

import classes from './HeaderButton.module.css';

const HeaderButton = (props) => {
  const [isBtnBumpt, setIsBtnBumpt] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  useEffect(() => {
    if (items.length === 0) return;
    setIsBtnBumpt(true);
    const timer = setTimeout(() => {
      setIsBtnBumpt(false);
    }, 300);

    return () => clearInterval(timer);
  }, [items]);

  const numberOfItems = cartCtx.items.reduce((acc, cur) => acc + cur.amount, 0);
  const btnClasses = `${classes.button} ${isBtnBumpt ? classes.bump : ''}`;

  return (
    <button onClick={props.onClick} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderButton;
