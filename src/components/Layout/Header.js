import HeaderButton from './HeaderButton';

import mainImg from '../../assets/img/meals.jpg';

import classes from './Header.module.css';

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={mainImg} alt='A table fool of tasty food' />
      </div>
    </>
  );
};

export default Header;
