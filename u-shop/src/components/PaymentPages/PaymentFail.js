import React from "react";
import "./PaymentFail.css";
import { useNavigate } from "react-router-dom";

const PaymentFail = () => {
  const navigateTo = useNavigate();

  return (
    <div>
      <div id="fail-main">
        <div id="fail">
          <i class="fa-solid fa-circle-xmark fa-2x"></i>
          <h2>Payment Failed</h2>
          <p>Something went wrong.. try again!</p>
          <button onClick={() => navigateTo("/")}>Continue Shopping</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;
