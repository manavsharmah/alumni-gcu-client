import React, { useEffect } from 'react';
import Article from '../../components/common/Article-container';
import "../pages.css";

const Donations = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY", // Replace with your actual Razorpay key
      amount: "50000", // Amount in smallest currency unit (e.g., 50000 paise = ₹500)
      currency: "INR",
      name: "Your Organization Name",
      description: "Donation",
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        // Handle successful payment here (e.g., update database, show thank you message)
      },
      prefill: {
        name: "Donor Name",
        email: "donor@example.com",
        contact: "9999999999"
      },
      notes: {
        address: "Your Organization Address"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className='page-container'>
      <Article title="Donations">
        <p>Support our cause by making a donation.</p>
        <div className="razorpay-button-container">
          <button onClick={handlePayment} className="razorpay-button">
            Donate Now
          </button>
        </div>
      </Article>     
    </div>
  );
};

export default Donations;
