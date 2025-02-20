import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "./CheckoutForm";

const stripePromise= loadStripe(import.meta.env.VITE_PAYMENT_PUBLISH_KEY)

function Element() {
    // const options = {
    //     // passing the client secret obtained from the server
    //     clientSecret: '{{CLIENT_SECRET}}',
    //   };
    
    //   options={options} 
    
  return (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
  )
}

export default Element