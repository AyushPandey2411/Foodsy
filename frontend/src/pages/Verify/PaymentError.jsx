import React from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentError.css"; // Import the CSS file

const PaymentError = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-error-container">
      <div className="payment-error-card">
        <div className="error-icon">✖</div>
        <h1 className="error-title">Payment Failed</h1>
        <p className="error-message">
          Unfortunately, we couldn’t process your payment. Please try again or contact support.
        </p>
        <div className="button-group">
          <button
            onClick={() => navigate("/")}
            className="primary-button"
          >
            Go to Home
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default PaymentError;
