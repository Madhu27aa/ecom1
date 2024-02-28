import React, { useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useRouter } from 'next/router'; // Import useRouter hook
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import { makePayment } from './MakePaymentComponent';
import CheckoutPage from './CheckoutPage';

const CartItem = React.memo(({ item, toggleCartItemQuanitity, onRemove }) => (
  <div className="product">
    <img src={urlFor(item?.image[0])} className="cart-product-image" />
    <div className="item-desc">
      <div className="flex top">
        <h5>{item.name}</h5>
        <h4>₹{item.price}</h4>
      </div>
      <div className="flex bottom">
        <div>
          <p className="quantity-desc">
            <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec')}>
              <AiOutlineMinus />
            </span>
            <span className="num">{item.quantity}</span>
            <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc')}>
              <AiOutlinePlus />
            </span>
          </p>
        </div>
        <button
          type="button"
          className="remove-item"
          onClick={() => onRemove(item)}
        >
          <TiDeleteOutline />
        </button>
      </div>
    </div>
  </div>
));

const Cart = () => {
  const cartRef = useRef();
  const router = useRouter(); // Initialize useRouter hook
  const [showCheckoutPage, setShowCheckoutPage] = useState(false); // State to track whether to show checkout page or not
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();

  const handleCheckout = async () => {
    // Navigate to the checkout page
    router.push('/checkout');
  }

  const memoizedCartItems = useMemo(() => (
    cartItems.map((item, index) => (
      <CartItem key={`${item._id}-${index}`} item={item} toggleCartItemQuanitity={toggleCartItemQuanitity} onRemove={onRemove} />
    ))
  ), [cartItems]);

  return (
    <div ref={cartRef} className="cart-wrapper">
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}>
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {memoizedCartItems}
        </div>
      </div>

      {cartItems.length >= 1 && (
       <div className="cart-bottom">
       <h1>Summary</h1>
       <div className="total"> <h3>Total:</h3>
         <div className="total-price"> <h3>₹{totalPrice}</h3></div>
       </div>
       <div className="btn-container">
         <button type="button" className="btn" onClick={handleCheckout}>Checkout</button>
         <Link href="/"><button type="button" className="btn">Continue Shopping</button></Link>
       </div>
     </div>
     
      )}
    </div>
  )
}

export default Cart;

