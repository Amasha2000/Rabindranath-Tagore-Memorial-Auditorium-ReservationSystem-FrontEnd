import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Payment.css'; 

const Payment = () => {
  const { reservationId, amount, paymentType } = useParams(); 
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isConfirmed = window.confirm("Are you sure you want to proceed with the payment?");
  
    if (!isConfirmed) {
     return; 
   }

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);
    
    try {
      const { token } = await stripe.createToken(cardElement);

      // Send token and payment details to backend
      const paymentDto = {
        paymentType,
        amount,
      };

      const response = await axios.post(
        `http://localhost:8080/payment/process/${reservationId}?token=${token.id}`,
        paymentDto
      );

      if (response.status === 200) {
        setSuccess(true);
      } else {
        setError('Payment failed');
      }
    } catch (error) {
      setError('Error processing payment');
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate(-1); 
  };

  return (
    <div className="payment-container">
       <button onClick={handleBackClick} className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} /> 
      </button>
      <div className="payment-card">
        <h1>Payment for Reservation</h1>
        <p>Amount to pay: Rs.{amount}</p>
        <form onSubmit={handleSubmit}>
          <CardElement className="CardElement" />
          <button type="submit" disabled={!stripe || success}>
             {loading ? 'Processing...' : 'Pay'}
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Payment successful!</div>}
      </div>
    </div>
  );
};

export default Payment;
