export const createPaymentRequest = async (amount, currency) => {
    try {
        const response = await fetch("https://api.loopcrypto.xyz/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_LOOPCRYPTO_API_KEY}`,
          },
          body: JSON.stringify({
            merchant_id: import.meta.env.VITE_MERCHANT_ID,
            amount,
            currency,
            callback_url: "https://www.moramba.app/payment-success", // Success page
            metadata: {
              invoice_id: `INV-${Date.now()}`,
            },
          }),
        });

        const data = await response.json();
        if (data.payment_url) {
            window.location.href = data.payment_url; // Redirect user to pay
        } else {
            console.error("Payment creation failed:", data);
        }
    } catch (error) {
        console.error("Error creating payment request:", error);
    }
};


