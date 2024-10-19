// Payment.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests
import '../styles/Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { campaign } = location.state; // Access campaign data from previous page

  const [amount, setAmount] = useState('');
  const [name, setName] = useState(''); // New state for name
  const [email, setEmail] = useState(''); // New state for email
  const [customTip, setCustomTip] = useState(19);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/charity/donate/', {
        campaign: campaign.id,
        amount,
        donor_name : name,
        donor_email : email,
        tip: customTip,
        is_anonymous: isAnonymous,
        is_subscribed: isSubscribed,
      });

      console.log(response.data);
      navigate('/thank-you'); // Redirect to thank you page after donation
    } catch (error) {
      console.error('Error during donation:', error);
    }
  };

  // Calculate total amount
  const donationAmount = parseFloat(amount) || 0; // Ensure it's a number
  const tipAmount = (donationAmount * customTip) / 100; // Calculate the tip
  const totalAmount = donationAmount + tipAmount; // Total amount


  return (
    <div className="payment-background">
      <div className="payment-container">
        <h2>You’re supporting <b>{campaign.title}</b></h2>
        <img src={campaign.image} alt={campaign.title} className="campaign-image" /> {/* Add campaign image */}
        

        <form onSubmit={handleSubmit}>
          <div className="donation-amount">
            <label>Enter your donation:</label>
            <input
              type="number"
              placeholder="Other amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="donor-info">
            <label>Your Name:</label>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            /> <br />
            <label>Your Email:</label>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <p>Your tip will benefit <b>CharityFlow.org</b></p>

          <div className="tip-section">
            <label>Tip CharityFlow services:</label>
            <input
              type="range"
              min="0"
              max="30"
              value={customTip}
              onChange={(e) => setCustomTip(e.target.value)}
            />
            <p>{customTip}%</p>
          </div>

           {/* Display Donation Amount, CharityFlow Tip, and Total Amount */}
           <div className="amount-summary">
            <p><strong>Donation Amount:</strong> ₹{donationAmount.toFixed(2)}</p><hr />
            <p><strong>CharityFlow Tip: ({customTip}%)</strong> ₹{tipAmount.toFixed(2)}</p><hr /> 
            <p><strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}</p><hr />
          </div>

          <div className="donor-preferences">
            <label>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={() => setIsAnonymous(!isAnonymous)}
              />
              Don't display my name publicly on the campaign.
            </label>
            
          </div>

          <button type="submit">Complete Payment</button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
