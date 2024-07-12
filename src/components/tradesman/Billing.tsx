import React, { useEffect, useState } from "react";
import ModalComponent from "../common/ModalComponent";
import {
    Input,
    InputGroup,
    InputLeftElement,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
} from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { RiMenuAddFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { getProfileMinimum } from "../../api/tradesmanApi";
import { createInvoice } from "../../api/bookingApi";

const Billing = ({
    isOpenI,
    onCloseI,
    onOpenI,
    tradesmanId,
    bookingId,
    days,
    changeParentState
}) => {
    const [bill, setBill] = useState<
        { description: string; amount: string; quantity: string }[]
    >([{ description: "Wage", amount: "", quantity: days + "" }]);

    useEffect(() => {
        (async () => {
            const res = await getProfileMinimum(tradesmanId);
            if (res?.data) {
                setBill([
                    {
                        description: "Wage",
                        amount: res.data.wage.amount,
                        quantity: days + "",
                    },
                ]);
            }
        })();
    }, []);

    const addBillItem = () => {
        const noEmpty = bill.every((item) => item.description && item.amount);
        if (noEmpty) {
            setBill([...bill, { description: "", amount: "", quantity: "1" }]);
        } else {
            toast.error("Please fill existing fields");
        }
    };

    const removeBillItem = (index) => {
        const newBill = bill.filter((_, i) => i !== index);
        setBill(newBill);
    };

    const updateBill = (
        value: string | number,
        index: number,
        type: "description" | "amount" | "quantity"
    ) => {
        console.log("hiiii");

        const newBill = bill.map((item, i) => {
            if (i === index) {
                if (type == "description") {
                    item.description = value as string;
                } else if (type == "amount") {
                    item.amount = value as string;
                } else {
                    item.quantity = value as string;
                }
            }
            return item;
        });
        setBill(newBill);
    };

    const submitDetails = async () => {
        const allFilled = bill.every((item) => item.description && item.amount);
        if (!allFilled) {
            toast.error("Please fill all the fields");
            return;
        }

        const res = await createInvoice({
            bookingId,
            particulars: bill,
            total: bill.reduce(
                (acc, curr) =>
                    acc + Number(curr.amount) * Number(curr.quantity),
                0
            ),
        });
        if (res?.data) {
            setBill([]);
            onCloseI();
            changeParentState();
            toast.success("Invoce created")
        }
    };

    return (
        <ModalComponent
            isOpen={isOpenI}
            onClose={onCloseI}
            title={"Invoice"}
            action={{
                text: "Create",
                color: "blue",
                onClick: submitDetails,
                disabled: bill.length === 0,
            }}
        >
            <div className="w-[calc(full-20px)] max-w-[400px]">
                <div className="grid grid-cols-7 gap-1 mb-3">
                    {bill.map((item, index) => (
                        <>
                            <Input
                                className="col-span-3"
                                size={"sm"}
                                placeholder="Description"
                                value={item.description}
                                onChange={(e) =>
                                    updateBill(
                                        e.target.value,
                                        index,
                                        "description"
                                    )
                                }
                            />
                            <div className="col-span-2 flex items-center mx-1">
                                <Text
                                    pointerEvents="none"
                                    color="gray.700"
                                    fontSize="md"
                                >
                                    &#8377;
                                </Text>
                                <NumberInput
                                    step={1}
                                    size={"sm"}
                                    value={item.amount}
                                    onChange={(valueString) =>
                                        updateBill(valueString, index, "amount")
                                    }
                                >
                                    <NumberInputField />
                                </NumberInput>
                            </div>
                            <div className="flex col-span-2 items-center">
                                <IoMdClose size={24} />
                                <NumberInput
                                    step={1}
                                    min={1}
                                    size={"sm"}
                                    value={item.quantity}
                                    onChange={(valueString) =>
                                        updateBill(
                                            valueString,
                                            index,
                                            "quantity"
                                        )
                                    }
                                >
                                    <NumberInputField />
                                </NumberInput>
                                <button
                                    className="ms-2 bg-red-500 text-white h-full"
                                    onClick={() => removeBillItem(index)}
                                >
                                    <IoMdClose />
                                </button>
                            </div>
                        </>
                    ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                        <button
                            className="hover:bg-gray-300"
                            onClick={addBillItem}
                        >
                            <RiMenuAddFill size={18} />
                        </button>
                    </div>
                    <div className="flex ms-3 mt-5 text-lg font-semibold">
                        <Text>&#8377; </Text>
                        <Text>
                            {bill.reduce(
                                (acc, curr) =>
                                    acc +
                                    Number(curr.amount) * Number(curr.quantity),
                                0
                            )}
                        </Text>
                    </div>
                </div>
            </div>
        </ModalComponent>
    );
};

export default Billing;
