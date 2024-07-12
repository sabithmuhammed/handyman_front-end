import { useCallback, useEffect } from "react";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import { createOrder } from "../../api/commonApi";
import React from "react";
import { Text } from "@chakra-ui/react";
import { paymentSuccess } from "../../api/bookingApi";
import { toast } from "react-toastify";

const RazorPayPayment = ({
    amount,
    name,
    bookingId,
    changeParentState
}: {
    amount: number;
    name: string;
    bookingId: string;
    changeParentState:()=>void
}) => {
    console.log(bookingId);
    
    const [Razorpay, isLoaded] = useRazorpay();

    const handlePayment = useCallback(async () => {
        const res = await createOrder(amount);
        const order = res?.data;

        const options: RazorpayOptions = {
            key: import.meta.env.RAZORPAY_ID_KEY,
            amount: "3000",
            currency: "INR",
            name: "handyMan",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id,
            handler: async (res) => {
                const response = await paymentSuccess(bookingId);
                if (response?.data) {
                    toast.success("Payment successful");
                    changeParentState()
                }
            },
            prefill: {
                name: name,
            },
            notes: {
                address: "handyMan",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzpay = new Razorpay(options);
        rzpay.open();
    }, [Razorpay]);

    // useEffect(() => {
    //     if (isLoaded) {
    //         handlePayment();
    //     }
    // }, [isLoaded, handlePayment]);

    return (
        <button
            onClick={handlePayment}
            className=" flex  items-center px-2 border-green-500 border-2 rounded hover:bg-green-200"
        >
            <Text fontWeight={"bold"} fontSize={"sm"} color={"green.500"}>
                Pay &#8377; {amount}
            </Text>
        </button>
    );
};

export default RazorPayPayment;
