import React from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const paymentId = searchParams.get("payment_id");

    return (
        <div>
            <h2>Payment Successful! 🎉</h2>
            <p>Your Payment ID: {paymentId}</p>
        </div>
    );
};

export default PaymentSuccess;
