import React from "react";

const BuyOrSell = (props) => {
  return (
    <div
      className="btn-group btn-group-lg col-md-12 my-4"
      role="group"
      aria-label="Basic example"
    >
      <button
        onClick={() => props.toggleBuyOrSell("buy")}
        type="button"
        className={
          "btn btn-primary" + (props.buyOrSell === "buy" ? " active" : "")
        }
      >
        Buy
      </button>
      <button
        onClick={() => props.toggleBuyOrSell("sell")}
        type="button"
        className={
          "btn btn-primary" + (props.buyOrSell === "sell" ? " active" : "")
        }
      >
        Sell
      </button>
    </div>
  );
};

export default BuyOrSell;
