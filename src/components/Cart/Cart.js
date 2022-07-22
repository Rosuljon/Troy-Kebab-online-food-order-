import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `₩${cartCtx.totalAmount}`;
  const hasItem = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const orderHandler = () => {
    setIsCheckout(true);
  };
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://troy-kebab-food-order-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setSubmitted(true);
    cartCtx.clearCart();
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        close
      </button>
      {hasItem && (
        <button onClick={orderHandler} className={classes.button}>
          order
        </button>
      )}
    </div>
  );
  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onData={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}    
    </React.Fragment>
    );
  const submittingCartContent = <p>Sending order data</p>  
  const submittedCartContent = <React.Fragment>
    <p>Successfully sent the order</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        close
      </button>
    </div>
  </React.Fragment> 

  return <Modal onClose={props.onClose}>
    {!isSubmitting && !submitted && cartModalContent}
    {isSubmitting && submittingCartContent}
    {!isSubmitting && submitted && submittedCartContent }
  </Modal>;
};

export default Cart;
