import React, { useState } from "react";
import toast from "react-hot-toast";

const Quantity = ({ prod, setCartTotalPrice, cartTotalPrice }) => {
  const [quantity, setQuantity] = useState(1);

  const IncrementProdQuantity = () => {
    if (quantity == 5) {
      setQuantity(5);
      toast.error("You reached the maximum Product qunatity to purchase");
    } else {
      setQuantity(quantity + 1);
      setCartTotalPrice(cartTotalPrice + prod?.price);
    }

    prod.qnty = quantity + 1;
  };

  const DecrementProdQuantity = () => {
    if (quantity == 1) {
      setQuantity(1);
      toast.error("Minimum Quantity required to buy the product!");
    } else {
      setQuantity(quantity - 1);
      setCartTotalPrice(cartTotalPrice - prod?.price);
    }

    prod.qnty = quantity - 1;
  };

  return (
    <>
      {" "}
      <div id="quantity-container">
        <i
          class="fa-solid fa-plus"
          onClick={() => IncrementProdQuantity(prod?.price)}
        ></i>
        <span>{quantity}</span>
        <i
          class="fa-solid fa-minus"
          onClick={() => DecrementProdQuantity()}
        ></i>
      </div>
    </>
  );
};

export default Quantity;
