import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'
import { router } from 'next/router'; // Import useRouter hook

import { Cart } from './';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  const navigateToCart = () => {
    router.push('/cart');
  }
  
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">The Dessert Stop</Link>
      </p>

      <button type="button" className="cart-icon" onClick={navigateToCart}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

    </div>
  )
}

export default Navbar