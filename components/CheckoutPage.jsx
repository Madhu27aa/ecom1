import React, { useState } from 'react';
import { makePayment } from './MakePaymentComponent';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    alternatePhone: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Process the form data, make the payment, and save details to your database
    console.log(formData);
    makePayment(); // Call makePayment function if necessary
  };

  return (
    <div className="checkout-page" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Enter Shipping Details</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          style={{ marginBottom: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={{ marginBottom: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
          style={{ marginBottom: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="tel"
          name="alternatePhone"
          value={formData.alternatePhone}
          onChange={handleChange}
          placeholder="Alternate Phone"
          style={{ marginBottom: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          required
          style={{ marginBottom: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        ></textarea>
        <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Proceed to Payment</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
