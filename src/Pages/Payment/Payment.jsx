// import Element from "./Element";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../Auth/UseAuth/useAuth";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const stripePromise= loadStripe(import.meta.env.VITE_PAYMENT_PUBLISH_KEY)

function Payment() {
  const [clientSecret, setClientSecret] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const{user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const studySessionData = useLoaderData();
  const {_id: sessionId,tutorEmail, registrationFee: amount} = studySessionData[0];

  // console.log(items);
  
  useEffect(()=>{
    const items = {sessionId, amount, tutorEmail, studentEmail: user?.email}
    axiosSecure.post(`/create-payment-intent?email=${user?.email}`, items)
    .then(res =>{
      console.log(res.data);
      setClientSecret(res.data.clientSecrete);
      setIsLoading(false);
    })
  }, [axiosSecure,amount,tutorEmail, sessionId, user.email])
  
  const options = {
    clientSecret,
    theme: 'stripe'
  }

  console.log(options);

  if(isLoading) return <p>Loading...</p>
  
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm sessionId={sessionId} />
    </Elements>
  );
}

export default Payment;
