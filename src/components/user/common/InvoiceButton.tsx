import React, { useState } from "react";
import easyinvoice from "easyinvoice";

import { MdOutlineFileDownload } from "react-icons/md";
import { Text } from "@chakra-ui/react";
import Invoice from "../../../types/stateTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import logoImg from "../../../assets/logo.png";
import beatLoader from "../../../assets/animation/beatLoader.json";
import Lottie from "lottie-react";

const InvoiceButton = ({
    invoiceNumber,
    particulars,
    createdAt,
    tradesman,
}: Invoice & { tradesman: string }) => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [loading, setLoading] = useState(false);
    const invoiceData = {
        documentTitle: "handyMan", // Defaults to INVOICE
        currency: "INR",
        taxNotation: "vat", // Defaults to "vat"
        marginTop: 25,
        marginRight: 25,
        marginLeft: 25,
        marginBottom: 25,
        logo: logoImg, // Optional
        sender: {
            company: tradesman,
        },
        client: {
            company: userInfo?.name,
        },
        invoiceNumber: invoiceNumber,
        invoiceDate: new Date(createdAt).toLocaleDateString("AU"),
        products: particulars.map((product) => ({
            quantity: product.quantity as unknown as string,
            description: product.description,
            price: product.amount, // Map `amount` to `price`
        })),
        bottomNotice: "Kindly pay your invoice within 5 days.",
    };

    const generateInvoice = async () => {
        const result = await easyinvoice.createInvoice(invoiceData);
        easyinvoice.download("my-invoice.pdf", result.pdf);
    };

    return (
        <button
            className="mx-6 flex flex-col items-center justify-center disabled:text-gray-500"
            onClick={async () => {
                setLoading(true);
                await generateInvoice();
                setLoading(false);
            }}
            disabled={loading}
        >
            {loading ? (
                <div className="overflow-hidden h-[40px] flex items-center">
                    <Lottie
                        animationData={beatLoader}
                        loop={true}
                        className="h-[100px]"
                    />
                </div>
            ) : (
                <>
                    <MdOutlineFileDownload size={26} className="me-2" />
                    <Text fontWeight={"bold"} fontSize={"xs"}>
                        Invoice
                    </Text>
                </>
            )}
        </button>
    );
};

export default InvoiceButton;
