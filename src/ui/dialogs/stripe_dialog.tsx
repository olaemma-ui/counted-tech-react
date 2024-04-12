import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Link, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Divider, Spinner} from "@nextui-org/react";
import { ArrowDownIcon, PencilIcon, TrashIcon } from "../../_components/svg_components";
import { JobData, JobDataConvert } from "../../interface/response/dashboard_data";
import { LocalStorageService } from "../../service/local_storage";
import { toFormData } from "axios";
import { LocalStoragekey } from "../../_constants/enums";
import { axiosInstance } from "../../service/axios_conf";
import ConfirmDialog from "./confirm_dialog";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";



const stripePromise = loadStripe(import.meta.env.VITE_COUNTEDT_TECH_STRIPE_PUBLIC_KEY);

interface StripeDialogProps{
    onClose?: () => void,
    isOpen: boolean,
    body: {
        month: string,
        quantity: string,
        id: string,
    }
}

export function StripeDialog(props: StripeDialogProps) {
    
    const options : StripeElementsOptions = {
        mode: 'payment',
        amount: 1099,
        currency: 'eur',
        // Fully customizable with appearance API.
        appearance: {/*...*/},
    };

    const {isOpen, onOpenChange} = useDisclosure({
      isOpen: props.isOpen,
      onClose: props.onClose,
    });
    
    // console.log('props.body = ', props.body);
    

  return (
    <>
      {/* <Button onPress={onOpen} color="primary">Open Modal</Button> */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
        isDismissable={false}
        size="md"
        scrollBehavior="inside"

      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black text-center"></ModalHeader>
              <ModalBody>
                <Elements stripe={stripePromise} options={options}>
                   <StripeCheckout options={props.body}/>
                </Elements>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}


export function StripeCheckout(options : any) {

    const stripe = useStripe();
    const elements = useElements();

    const [body, setBody] = useState(options);
    // console.log({stripe});

    // console.log('checkout body = ', {body});
    



    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);


    const handleError = (error) => {
        setLoading(false);
        setErrorMessage(error.message);
    }
    
      const handleSubmit = async (event: any) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
    
        if (!stripe) {
          // Stripe.js hasn't yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
    
        setLoading(true);
    
        // Trigger form validation and wallet collection
        const {error: submitError} = await elements.submit();
        if (submitError) {
          handleError(submitError);
          return;
        }
        // Create the PaymentIntent and obtain clientSecret
        const res =  await fetchToken(body.options);
          console.log({res});
        
        const clientSecret = await res.data.token;
        
        // Confirm the PaymentIntent using the details collected by the Payment Element
        const {error} = await stripe.confirmPayment({
          elements,
          clientSecret,
          confirmParams: {
            return_url: `${window.location.origin}/payment`,
            receipt_email: JSON.parse(LocalStorageService.getItem(LocalStoragekey.COMPANY_DATA)).email
          },
        }, );
    
        if (error) {
          // This point is only reached if there's an immediate error when
          // confirming the payment. Show the error to your customer (for example, payment details incomplete)
          handleError(error);
        } else {
          // Your customer is redirected to your `return_url`. For some payment
          // methods like iDEAL, your customer is redirected to an intermediate
          // site first to authorize the payment, then redirected to the `return_url`.
          // await completePayment(res.data.data.order_id);
          // console.log({orderSummary});
        }
      };

      async function fetchToken(body: any) {
        const res =  await axiosInstance.post(
          'company/create-payment', 
          toFormData(body))
          .then((response) => {
            LocalStorageService.setItem(LocalStoragekey.PAKCAGE_DETAILS, body);
            LocalStorageService.setItem(LocalStoragekey.ORDER_SUMMARY, response.data);
            return response
          });

          return res;
      }


  return (
    <>
       <form onSubmit={handleSubmit}>
            <PaymentElement/>    
           {stripe && <Button 
                color="primary" 
                type="submit" 
                isDisabled={stripe == null}
                isLoading={loading}
                className="w-full mt-3">
                Make Payment 
            </Button>}
        </form>
    </>
  );
}

