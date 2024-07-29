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
    changeParentState,
}: {
    amount: number;
    name: string;
    bookingId: string;
    changeParentState: (bookingId:string) => void;
}) => {

    const [Razorpay, isLoaded] = useRazorpay();

    const handlePayment = useCallback(async (bookingId:string) => {
        const res = await createOrder(amount);
        const order = res?.data;

        const options: RazorpayOptions = {
            key: import.meta.env.RAZORPAY_ID_KEY,
            amount: (amount*10).toString(),
            currency: "INR",
            name: "handyMan",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id,
            handler: async (res) => {
                const response = await paymentSuccess(bookingId);
                if (response?.data) {
                    toast.success("Payment successful");
                    changeParentState(bookingId);
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
            onClick={()=>handlePayment(bookingId)}
            className="bg-yellow-400 ms-4 flex items-center px-1 rounded-sm"
        >
            <Text fontSize={"sm"} color={"black"}>
                Pay &#8377; {amount}
            </Text>
        </button>
    );
};

export default RazorPayPayment;
