import { useReducer } from 'react';

import CartContext from './cart-context';

const defaulCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];

    let updatedItems;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = [...state.items, action.item];
    }

    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }

  if (action.type === 'REMOVE') {
    const existinItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existinItemIndex];

    const updatedAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = [...state.items].filter((item) => item.id !== action.id);
    } else {
      updatedItems = [...state.items];
      updatedItems[existinItemIndex].amount = existingItem.amount - 1;
    }
    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }

  return defaulCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaulCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item });
  };
  const removeItemHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
