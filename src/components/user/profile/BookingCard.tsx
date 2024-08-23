import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    StackDivider,
    Text,
    Textarea,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsCalendar3 } from "react-icons/bs";
import { IoMdChatbubbles } from "react-icons/io";
import { LuClock5 } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import { BookingType, ReviewType } from "../../../types/stateTypes";
import { AiOutlineNumber } from "react-icons/ai";
import { MdHomeWork, MdDescription } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import RazorPayPayment from "../../common/RazorPayPayment";
import {
    editReview,
    getReviewForBooking,
    postReview,
} from "../../../api/reviewApi";
import ModalComponent from "../../common/ModalComponent";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import ReviewAndRating from "./ReviewAndRating";
import { toast } from "react-toastify";

type PropType = BookingType & {
    handleCancelPress: (bookingId: string) => void;
    changePaymentStatus: (bookingId: string) => void;
};

export const BookingCard = ({
    _id,
    tradesmanId,
    address,
    description,
    bookingNumber,
    bookingDate,
    slots,
    status,
    amount,
    paymentDetails,
    service,
    handleCancelPress,
    changePaymentStatus,
}: PropType) => {
    const [review, setReview] = useState<ReviewType | null>(null);
    const [reviewEdit, setReviewEdit] = useState<{
        rating: number;
        review: string;
    }>(
        review
            ? { review: review.review, rating: review.rating }
            : { review: "", rating: 0 }
    );

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (status === "completed") {
            (async () => {
                const res = await getReviewForBooking(_id);
                if (res?.data) {
                    setReview(res.data);
                }
            })();
        }
    }, [status]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const convertTo12HourFormat = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        const period = hours >= 12 ? "PM" : "AM";
        const adjustedHours = hours % 12 || 12;
        return `${adjustedHours}:${minutes
            .toString()
            .padStart(2, "0")} ${period}`;
    };

    const checkDateIsBigger = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const curDate = new Date(date);
        curDate.setHours(0, 0, 0, 0);
        return curDate <= today;
    };

    const postNewReview = async () => {
        if (reviewEdit.rating === 0) {
            toast.error("Please select a star");
            return;
        }
        setLoading(true);
        const res = await postReview({
            ...reviewEdit,
            bookingId: _id,
            tradesmanId:
                typeof tradesmanId === "string" ? tradesmanId : tradesmanId._id,
        });
        if (res?.data) {
            setReview(res.data);
        }
        setLoading(false);
        onClose();
    };

    const editThisReview = async () => {
        if (reviewEdit.rating === 0) {
            toast.error("Please select a star");
            return;
        }
        setLoading(true);
        if (review) {
            const res = await editReview(review._id, {
                ...reviewEdit,
            });
            if (res?.data) {
                setReview(res.data);
            }
        }
        setLoading(false);
        onClose();
    };

    return (
        <div className=" w-full  rounded-lg  overflow-hidden   my-3 border-t-2  border-indigo-950/90 text-gray-700">
            <div className=" lg:rounded-e-lg rounded-t-none bg-white p-3 border-b-2 border-indigo-950/90 shadow-lg">
                <div className="flex justify-between ">
                    <div className="flex items-center flex-wrap">
                        <Text
                            fontSize={"md"}
                            me={3}
                            title="Go to profile"
                            cursor={"pointer"}
                            onClick={() =>
                                navigate(
                                    `/tradesman-profile/${
                                        typeof tradesmanId !== "string"
                                            ? tradesmanId._id
                                            : tradesmanId
                                    }`
                                )
                            }
                        >
                            {typeof tradesmanId !== "string" &&
                                tradesmanId.name}
                        </Text>
                        <Text fontSize={"sm"} color={"gray.600"} me={3}>
                            {service}
                        </Text>
                    </div>
                    <div
                        className={`px-3 ${
                            status === `completed`
                                ? `bg-green-300`
                                : status === `canceled`
                                ? `bg-red-300`
                                : `bg-blue-300`
                        }  text-gray-600 h-7 flex items-center rounded-md`}
                    >
                        <Text fontSize={"sm"} as={"i"} casing={"capitalize"}>
                            {status}
                        </Text>
                    </div>
                </div>
                <div className=" text-gray-600 my-3 flex flex-wrap">
                    <div className=" flex px-4 h-8 bg-gray-100 min-w-[120px] rounded-full items-center justify-between me-2 mb-2">
                        <BsCalendar3 />{" "}
                        <Text fontSize={"sm"} ms={2}>
                            {new Date(bookingDate)
                                .toLocaleString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })
                                .split("/")
                                .join("-")}
                        </Text>
                    </div>
                    {slots.map((time, index) => (
                        <div
                            className=" flex px-4 h-8 bg-gray-100 min-w-[120px] rounded-full items-center justify-between me-2 mb-2"
                            key={index}
                        >
                            <LuClock5 />{" "}
                            <Text fontSize={"sm"} ms={2}>
                                {time
                                    .split(" - ")
                                    .map((t) => convertTo12HourFormat(t))
                                    .reduce((acc, curr) => acc + " - " + curr)}
                            </Text>
                        </div>
                    ))}
                </div>
                <Accordion allowMultiple>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex="1" textAlign="right">
                                    <Text fontSize={"xs"}>More</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <VStack
                                spacing={2}
                                divider={<StackDivider />}
                                alignItems={"flex-start"}
                            >
                                <div className="flex">
                                    <AiOutlineNumber />
                                    <Text ms={3}>{bookingNumber}</Text>
                                </div>
                                <div className="flex">
                                    <MdDescription />
                                    <Text ms={3}>{description}</Text>
                                </div>
                                <div className="flex">
                                    <FaRupeeSign />
                                    <Text ms={3}>{amount}</Text>
                                </div>

                                <div className="flex">
                                    <MdHomeWork />
                                    <div className="ms-3">
                                        <Text>{address.house}</Text>
                                        <Text>{address.street}</Text>
                                        <Text>{address.city}</Text>
                                        <Text>{address.state}</Text>
                                        <Text>{address.country}</Text>
                                        <Text>{address.pincode}</Text>
                                    </div>
                                </div>
                            </VStack>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="w-full lg:w-fit  py-2 px-3 flex bg-indigo-950/90 rounded-b-lg shadow-lg">
                <Link
                    to={`/chat?user=${
                        typeof tradesmanId !== "string"
                            ? tradesmanId._id
                            : tradesmanId
                    }&t=true`}
                >
                    <IoMdChatbubbles color="white" size={22} />
                </Link>
                {!checkDateIsBigger(bookingDate) && status === "booked" && (
                    <button>
                        <MdCancel
                            size={22}
                            className="ms-4 text-red-300"
                            onClick={() => handleCancelPress(_id)}
                        />
                    </button>
                )}
                {status === "completed" && (
                    <button
                        className="ms-4 text-sm text-white"
                        onClick={() => {
                            setReviewEdit(
                                review
                                    ? {
                                          review: review.review,
                                          rating: review.rating,
                                      }
                                    : { review: "", rating: 0 }
                            );
                            onOpen();
                        }}
                    >
                        {review ? "Edit review" : "Post a review"}
                    </button>
                )}
                {status === "completed" ? (
                    paymentDetails.status == "pending" ? (
                        <RazorPayPayment
                            amount={Number(amount)}
                            name={""}
                            bookingId={_id}
                            changeParentState={changePaymentStatus}
                        />
                    ) : (
                        <button
                            className="bg-yellow-400 ms-4 flex items-center px-1 rounded-sm"
                            disabled
                        >
                            <IoMdCheckmarkCircleOutline
                                color="black"
                                size={18}
                            />
                            <Text fontSize={"sm"} color={"black"} ms={1}>
                                Paid
                            </Text>
                        </button>
                    )
                ) : (
                    ""
                )}
            </div>
            <ModalComponent
                isOpen={isOpen}
                onClose={onClose}
                title="Review & rating"
                action={{
                    color: "blue",
                    text: review ? "Edit" : "Post",
                    onClick: review ? editThisReview : postNewReview,
                    loading,
                }}
            >
                <ReviewAndRating
                    review={reviewEdit}
                    setReview={setReviewEdit}
                />
            </ModalComponent>
        </div>
    );
};
