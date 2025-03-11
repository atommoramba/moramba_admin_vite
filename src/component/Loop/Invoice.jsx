import React from "react";
import { createPaymentRequest } from "../../loopcrypto.js";

const Invoice = ({ amount, currency }) => {
    return (
        <div>
            <h2>Invoice Details</h2>
            <p>Amount: {amount} {currency}</p>
            <button onClick={() => createPaymentRequest(amount, currency)}>
                Pay with Crypto
            </button>
        </div>
    );
};

export default Invoice;
