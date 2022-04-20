import React from 'react';
import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/troya.jpg';
import classes from './Header.module.css';
const Header = (props) =>{
    return <React.Fragment>
        <header className={classes.header}>
            <h1>Troy Kebab</h1>
            <HeaderCartButton></HeaderCartButton>
        </header>
        <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    </React.Fragment>
};

export default Header;