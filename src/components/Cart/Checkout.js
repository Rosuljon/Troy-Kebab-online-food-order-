import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name : true,
        city : true,
        street : true,
        home : true
    })
    const nameRef = useRef();
    const cityRef = useRef();
    const streetRef = useRef();
    const homeRef = useRef();
    const isEmpty = value => value.trim() === '';
    const confirmHandler = (event) =>{
        event.preventDefault();
        const enteredCity = cityRef.current.value;
        const enteredName = nameRef.current.value;
        const enteredStreet = streetRef.current.value;
        const enteredHome = homeRef.current.value;

        const nameValid = !isEmpty(enteredName);
        const cityValid = !isEmpty(enteredCity);
        const streetValid = !isEmpty(enteredStreet);
        const homeValid = !isEmpty(enteredHome);
        setFormInputsValidity({
            name : nameValid,
            city : cityValid,
            street : streetValid,
            home : homeValid
        });

        const formIsValid = nameValid && cityValid && streetValid && homeValid;
        if(!formIsValid){
            return;
        }
       props.onData({
        name : enteredName,
        city : enteredCity,
        street : enteredStreet,
        home : enteredHome
       });
    }

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameRef}></input>
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef}></input>
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef}></input>
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.home ? '' : classes.invalid}`}>
        <label htmlFor="home">Home</label>
        <input type="text" id="home" ref={homeRef}></input>
        {!formInputsValidity.home && <p>Please enter a valid home number!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
