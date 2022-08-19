import { useContext } from 'react';

import Modal from '../UI/Modal/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';

import classes from './Cart.module.css';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const addItemHandler = (item) => {
    cartCtx.addItem(item);
  };

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          onAdd={() => addItemHandler({ ...item, amount: 1 })}
          onRemove={() => removeItemHandler(item.id)}
        >
          {item.name}
        </CartItem>
      ))}
    </ul>
  );

  const hasItems = cartCtx.items.length > 0;

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onClose} className={classes['button--alt']}>
          Close
        </button>
        {hasItems && <button className={classes['button']}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
