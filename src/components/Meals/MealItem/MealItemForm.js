import { useRef, useState } from 'react';
import Input from '../../UI/Input/Input';

import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const [isAmountValid, setIsAmountValid] = useState(true);
  const amountInputRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const enterAmount = amountInputRef.current.value;
    const enterAmountNum = +enterAmount;

    if (enterAmount.trim() === '' || enterAmountNum < 1 || enterAmountNum > 5) {
      setIsAmountValid(false);
      return;
    }

    props.addAmount(enterAmountNum);
  };

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: `amount_${props.id}`,
          type: 'number',
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1,
          name: props.name,
        }}
      />
      <button>+ Add</button>
      {!isAmountValid && <p>Enter valid amount between 1 and 5</p>}
    </form>
  );
};

export default MealItemForm;
