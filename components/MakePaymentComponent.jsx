import React from 'react';

const MakePaymentComponent = ({ totalPrice }) => {
  const makePayment = async () => {
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taxAmt: totalPrice,
      }),
    }).then((t) => t.json());

    const options = {
      key: process.env.rzp_test_sczWiTM8tm2RSY, // Enter the Key ID generated from the Dashboard
      name: "madhu.online",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thank you for your test donation",
      image: "https://manuarora.in/logo.png",
      handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        alert("Razorpay Response: " + response.razorpay_payment_id);
        //alert(response.razorpay_order_id);
        //alert(response.razorpay_signature);
      },
      prefill: {
        name: "pradeep das",
        email: "admin@indradhanu.online",
        contact: '9853785519',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  return (
    <div className="btn-container">
     <button onClick={() => makePayment(totalPrice)}>Pay ₹{totalPrice} now</button>
    </div>
  );
};
export const makePayment = async (totalPrice) => {
    // Export makePayment function separately
    // Use this function in Cart.jsx
    // ... copy the entire makePayment function from MakePaymentComponent.js
  };
export default MakePaymentComponent;
