import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

function CheckoutForm({sessionId}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(sessionId);

  const handlesubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    setIsLoading(true);
    setMessage("Payment is in progress...");

    

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/payment-success",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log("resulttt: ",result.error.message);
      setMessage(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handlesubmit} className="mt-10">
      <div className="card w-100 bg-gray-200 shadow-2xl rounded-lg">
        <div className="card-body p-6">
          <h1 className="card-title font-bold text-2xl mb-4 justify-center">
            Complete your payment here!
          </h1>

          <PaymentElement />
          <div className="card-actions justify-center">
            <button
              disabled={isLoading || !stripe || !elements}
              className="btn bg-[#AFD275] hover:bg-[#2f4021] rounded-xl text-white px-6 py-3 mt-6"
            >
              {isLoading ? "Loading ..." : "Pay"}
            </button>
          </div>
          {message && <div>{message}</div>}
        </div>
      </div>
    </form>
  );
}

export default CheckoutForm;
