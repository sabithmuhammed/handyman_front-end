import { Avatar, Box, Button, Input } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { PopoverComponent } from "../../common/PopoverComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { RiImageEditFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { updateUser } from "../../../api/userApi";
import { updateUserInfo } from "../../../redux/slice/authSlice";

export const ProfileTile = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [name, setName] = useState(userInfo?.name ?? "");
    const [image, setImage] = useState<File>();
    const [readOnly, setReadOnly] = useState(true);
    const imageRef = useRef<HTMLInputElement | null>(null);
    const nameInputRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const handleImgaeChange = () => {
        imageRef.current?.click();
    };
    const handleCancel = () => {
        setName(userInfo?.name ?? "");
        setImage(undefined);
        setReadOnly(true);
    };
    const handleSubmit = async () => {
        if (!name.trim()) {
            toast.error("Please input a valid name");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("name", name.trim());
        formData.append("image", image as File);
        formData.append("profile", userInfo?.profile ?? "");
        const res = await updateUser(formData);
        if (res?.data) {
            dispatch(updateUserInfo({ ...res.data }));
            setReadOnly(true);
        }
        setLoading(false);
    };
    return (
        <div className="h-[300px] flex items-center bg-white shadow-md p-4 rounded-lg  border-b-2 border-indigo-950/90 relative overflow-hidden">
            <svg
                id="wave"
                style={{ transform: "rotate(180deg)", transition: "0.3s" }}
                viewBox="0 0 1440 490"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 left-0 right-0 bottom-0 rounded-md -z-1"
            >
                <defs>
                    <linearGradient
                        id="sw-gradient-0"
                        x1="0"
                        x2="0"
                        y1="1"
                        y2="0"
                    >
                        <stop
                            stop-color="rgba(30, 27, 75, 1)"
                            offset="0%"
                        ></stop>
                        <stop
                            stop-color="rgba(30, 27, 75, 1)"
                            offset="100%"
                        ></stop>
                    </linearGradient>
                </defs>
                <path
                    style={{ transform: "translate(0, 0px)", opacity: "1" }}
                    fill="url(#sw-gradient-0)"
                    d="M0,49L120,40.8C240,33,480,16,720,73.5C960,131,1200,261,1440,261.3C1680,261,1920,131,2160,73.5C2400,16,2640,33,2880,106.2C3120,180,3360,310,3600,359.3C3840,408,4080,376,4320,351.2C4560,327,4800,310,5040,269.5C5280,229,5520,163,5760,163.3C6000,163,6240,229,6480,236.8C6720,245,6960,196,7200,204.2C7440,212,7680,278,7920,261.3C8160,245,8400,147,8640,114.3C8880,82,9120,114,9360,138.8C9600,163,9840,180,10080,220.5C10320,261,10560,327,10800,343C11040,359,11280,327,11520,294C11760,261,12000,229,12240,220.5C12480,212,12720,229,12960,261.3C13200,294,13440,343,13680,359.3C13920,376,14160,359,14400,326.7C14640,294,14880,245,15120,212.3C15360,180,15600,163,15840,204.2C16080,245,16320,343,16560,351.2C16800,359,17040,278,17160,236.8L17280,196L17280,490L17160,490C17040,490,16800,490,16560,490C16320,490,16080,490,15840,490C15600,490,15360,490,15120,490C14880,490,14640,490,14400,490C14160,490,13920,490,13680,490C13440,490,13200,490,12960,490C12720,490,12480,490,12240,490C12000,490,11760,490,11520,490C11280,490,11040,490,10800,490C10560,490,10320,490,10080,490C9840,490,9600,490,9360,490C9120,490,8880,490,8640,490C8400,490,8160,490,7920,490C7680,490,7440,490,7200,490C6960,490,6720,490,6480,490C6240,490,6000,490,5760,490C5520,490,5280,490,5040,490C4800,490,4560,490,4320,490C4080,490,3840,490,3600,490C3360,490,3120,490,2880,490C2640,490,2400,490,2160,490C1920,490,1680,490,1440,490C1200,490,960,490,720,490C480,490,240,490,120,490L0,490Z"
                ></path>
            </svg>
            <div className="flex flex-col  items-center w-full h-full">
                <div className="flex w-full justify-end z-10">
                    {readOnly ? (
                        <div className="">
                            <Button
                                size={"sm"}
                                colorScheme="gray"
                                onClick={() => {
                                    setReadOnly(false);
                                    nameInputRef.current?.focus();
                                }}
                            >
                                Edit
                            </Button>
                        </div>
                    ) : (
                        <div className="">
                            <PopoverComponent
                                description="Do you really want to discard these changes?"
                                action={{
                                    colorScheme: "red",
                                    handler: handleCancel,
                                    text: "Discard",
                                }}
                            >
                                <Button
                                    size={"sm"}
                                    colorScheme="gray"
                                    variant={"outline"}
                                    textColor={"white"}
                                    _hover={{}}
                                >
                                    Cancel
                                </Button>
                            </PopoverComponent>
                            <PopoverComponent
                                description="Do you really want to save these changes?"
                                action={{
                                    colorScheme: "blue",
                                    handler: handleSubmit,
                                    text: "Save",
                                }}
                            >
                                <Button
                                    size={"sm"}
                                    onClick={() => setReadOnly(false)}
                                    colorScheme="blue"
                                    ms={2}
                                    isLoading={loading}
                                >
                                    Save
                                </Button>
                            </PopoverComponent>
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-center w-full my-3">
                    <div className=" relative mb-4 ">
                        <Avatar
                            key={Date.now()}
                            position={"relative"}
                            src={
                                image
                                    ? URL.createObjectURL(image)
                                    : userInfo?.profile
                            }
                            name={name}
                            size={"xl"}
                            border={"3px solid white"}
                        />
                        {!readOnly && (
                            <Box
                                position={"absolute"}
                                right={0}
                                bottom={"10%"}
                                bg={"white"}
                                w={7}
                                h={7}
                                rounded={"full"}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                cursor={"pointer"}
                                _hover={{ bg: "gray.200" }}
                                onClick={handleImgaeChange}
                            >
                                <RiImageEditFill size={20} />
                            </Box>
                        )}
                    </div>
                    <div className=" flex flex-col items-center z-5">
                        <input
                            type="file"
                            name=""
                            id="image"
                            ref={imageRef}
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setImage(e.target.files[0]);
                                }
                            }}
                            hidden
                        />
                        <Input
                            fontSize={"2xl"}
                            bg={"white"}
                            rounded={"full"}
                            display={"inline-block"}
                            w={"fit-content"}
                            textAlign={"center"}
                            readOnly={readOnly}
                            value={name}
                            ref={nameInputRef}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            fontSize={"md"}
                            bg={"white"}
                            rounded={"full"}
                            mt={2}
                            display={"inline-block"}
                            w={"fit-content"}
                            textAlign={"center"}
                            defaultValue={userInfo?.email}
                            readOnly
                            disabled={!readOnly}
                        />{" "}
                        {/* </Input> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
