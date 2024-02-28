import React from 'react';
import { useStateContext } from '../context/StateContext';

const CheckoutPage = () => {
  const { totalPrice} = useStateContext();

  return (
    <div className="checkout-container">
      <div className="billing-details">
        <h2>Billing Details</h2>
        <div className="form-group">
          <label htmlFor="delivery-date">Delivery Date</label>
          <input type="date" id="delivery-date" name="delivery-date" placeholder="Select Delivery Date" required />
          <label htmlFor="delivery-time">Delivery Time</label>
          <input type="time" id="delivery-time" name="delivery-time"  placeholder="Select Delivery Time" required />
        </div>
        <div className="form-group full-name">
  <label htmlFor="full-name">Full Name</label>
  <input type="text" id="full-name" name="full-name"  placeholder="Enter full name" required />
</div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone"  placeholder="Enter phone number" required/>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" placeholder="Enter email"  required/>
        </div>
        <div className="form-group">
          <label htmlFor="recipient-name">Recipient Name</label>
          <input type="text" id="recipient-name" name="recipient-name" placeholder="Enter recipient name" required/>
          <label htmlFor="recipient-phone">Recipient Phone</label>
          <input type="tel" id="recipient-phone" name="recipient-phone" placeholder="Enter recipient phone" required/>
        </div>
        <div className="form-group">
          <label htmlFor="address" required>Address</label>
          <input type="text" id="address" name="address"placeholder="Enter address" required/>
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" placeholder="Enter city" required/>
          <label htmlFor="pincode">Pincode</label>
          <input type="text" id="pincode" name="pincode" placeholder="Enter pincode" required/>
        </div>
      </div>
      <div className="summary-box">
        <h2>Order Summary</h2>
        <div className="summary-item">
          <span>Subtotal</span>
          <span>₹{totalPrice}</span>
        </div>
        <div className="summary-item">
          <span>Delivery Charges</span>
          <span>₹5.00</span>
        </div>
        <div className="summary-item">
          <span>Total Price</span>
          <span>₹{totalPrice + 5.00}</span>
        </div>
        <button className="pay-online-btn">Pay Online</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
