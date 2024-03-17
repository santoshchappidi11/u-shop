import React from "react";
import "./PaymentSuccess.css";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigateTo = useNavigate();

  return (
    <div id="success-main">
      <div id="success">
        <i class="fa-solid fa-circle-check fa-2x"></i>
        <h2>Payment Successful</h2>
        <p>Thank you for your payment</p>
        <button onClick={() => navigateTo("/")}> Continue Shopping</button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
