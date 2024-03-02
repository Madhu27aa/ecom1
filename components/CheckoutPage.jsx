import React, { useEffect, useState } from 'react';
import { useStateContext } from '../context/StateContext';
import { router } from 'next/router'; // Import useRouter hook

const CheckoutPage = () => {
  const { totalPrice} = useStateContext();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    'delivery-date': '',
    'delivery-time': '',
    'full-name': '',
    'phone': '',
    'email': '',
    'recipient-name': '',
    'recipient-phone': '',
    'address': '',
    'city': '',
    'pincode': '',
  });

  useEffect(() => {
    const loadRazorpay = async () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    };

    loadRazorpay();

  }, []);

  const razorPay = (e)=>{
    var options = {
      key: "rzp_test_nkBBURxWVDhgQ6",
      key_secret:"6K3BEsw4CwsBNSyg4lOK7dtj",
      amount: totalPrice * 100,
      currency: "INR",
      name:formData['full-name'],
      prefill: {
        name: formData['full-name'],
        email: formData['email'],
        contact: formData['phone'],
      },
      theme: {
        color: "#3399cc"
      },
      handler: function(response) {
        // alert(response.razorpay_payment_id);
        setPaymentSuccess(true);
        router.push('/paymentsuccessful');

      }
    };

      if (window.Razorpay) {
        var pay = new window.Razorpay(options);
        pay.open();
      } 
    }
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handlePayment = () => {
      const requiredFields = ['delivery-date', 'delivery-time', 'full-name', 'phone', 'email', 'recipient-name', 'recipient-phone', 'address', 'city', 'pincode'];
      const isValid = requiredFields.every(field => formData[field].trim() !== '');
      if (isValid) {
        razorPay();
      } else {
        console.log(formData);
        alert('Please fill in all required fields.');
      }
    };

  return (
    <div className="checkout-container">
      <div className="billing-details">
        <h2>Billing Details</h2>
        <div className="form-group">
          <label htmlFor="delivery-date">Delivery Date</label>
          <input
            type="date"
            id="delivery-date"
            name="delivery-date"
            placeholder="Select Delivery Date"
            required
            onChange={handleInputChange}
          />
          <label htmlFor="delivery-time">Delivery Tim</label>
          <input
            type="time"
            id="delivery-time"
            name="delivery-time"
            placeholder="Select Delivery Time"
            required
            onChange={handleInputChange}
          />
          </div>
        <div className="form-group full-name">
        <label htmlFor="full-name">Full Name</label>
        <input
            type="text"
            id="full-name"
            name="full-name"
            placeholder="Enter Full name"
            required
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter Phone Number"
            required
            onChange={handleInputChange}
          />
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="recipient-name">Recipient Name</label>
          <input
            type="text"
            id="recipient-name"
            name="recipient-name"
            placeholder="Enter Recipient Name"
            required
            onChange={handleInputChange}
          />
          <label htmlFor="recipient-phone">Recipient Phone</label>
          <input
            type="tel"
            id="recipient-phone"
            name="recipient-phone"
            placeholder="Enter Recipient Number"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address" required>Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter Address"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="type"
            id="city"
            name="city"
            placeholder="Enter City"
            required
            onChange={handleInputChange}
          />
          <label htmlFor="pincode">Pincode</label>
          <input
            type="number"
            id="pincode"
            name="pincode"
            placeholder="Enter Pincode"
            required
            onChange={handleInputChange}
          />
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
        <button className="pay-online-btn" onClick={handlePayment}>Pay Online</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
