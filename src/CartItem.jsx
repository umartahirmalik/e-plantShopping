import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Convert values such as "$10" into 10
  const getNumericCost = (cost) => {
    if (typeof cost === 'number') return cost;

    const value = parseFloat(
      String(cost).replace(/[^0-9.]/g, '')
    );

    return isNaN(value) ? 0 : value;
  };

  // Total cost of all items in cart
  const calculateTotalAmount = () => {
    return cart
      .reduce(
        (total, item) =>
          total +
          getNumericCost(item.cost) * item.quantity,
        0
      )
      .toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();

    if (onContinueShopping) {
      onContinueShopping();
    }
  };

  // Increase quantity
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  // Decrease quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Delete item completely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Cost for one cart item
  const calculateTotalCost = (item) => {
    return (
      getNumericCost(item.cost) * item.quantity
    ).toFixed(2);
  };

  const handleCheckout = () => {
    alert('Coming Soon');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img
              className="cart-item-image"
              src={item.image}
              alt={item.name}
            />

            <div className="cart-item-details">
              <div className="cart-item-name">
                {item.name}
              </div>

              <div className="cart-item-cost">
                {item.cost}
              </div>

              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>

                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>

                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>

              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{ marginTop: '20px', color: 'black' }}
        className="total_cart_amount"
      ></div>

      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>

        <br />

        <button
          className="get-started-button1"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;