import {
    Avatar,
    Box,
    Button,
    Flex,
    HStack,
    Input,
    Stack,
    StackDivider,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaRegEdit, FaRegSave } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { PiCameraBold } from "react-icons/pi";
import { updateUserInfo } from "../../redux/slice/authSlice";
import { updateUser } from "../../api/userApi";
import Mybookings from "../../components/user/profile/Mybookings";
import { toast } from "react-toastify";
import { BsCalendar3 } from "react-icons/bs";
import { LuClock5 } from "react-icons/lu";
import { IoMdChatbubbles } from "react-icons/io";
import { MdCancel } from "react-icons/md";

const UserProfile = () => {
    const [isEdit, setIsEdit] = useState(false);
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [editImage, setEditImage] = useState<File>();
    const [editName, setEditName] = useState(userInfo?.name ?? "");
    const imageRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useDispatch();
    const handleImgaeChange = () => {
        imageRef.current?.click();
    };
    const handleSubmit = async () => {
        if (!editName.trim()) {
            toast.error("Please input a valid name");
            return;
        }
        const formData = new FormData();
        formData.append("name", editName);
        formData.append("image", editImage as File);
        formData.append("profile", userInfo?.profile ?? "");
        const res = await updateUser(formData);
        if (res?.data) {
            dispatch(updateUserInfo({ ...res.data }));
            setIsEdit(false);
        }
    };

    return (
        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-6 pt-10 md:pt-20 pb-7 min-h-screen md:h-screen px-5 text-gray-800">
            <div className="h-[300px] flex items-center bg-white shadow-md p-4 rounded-lg border-t-2 border-b-2 border-indigo-950/90">
                <div className="flex flex-col  items-center w-full h-full">
                    <div className="flex w-full justify-between">
                        {/* <button>
                            <Text
                                fontSize={"sm"}
                                px={2}
                                bg={"red.200"}
                                color={"gray.600"}
                                rounded={"md"}
                            >
                                Cancel
                            </Text>
                        </button> */}
                        <div className=""></div>
                        <button>
                            <Text
                                fontSize={"sm"}
                                px={2}
                                bg={"gray.200"}
                                color={"gray.600"}
                                rounded={"md"}
                            >
                                Edit
                            </Text>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-3 justify-evenly w-full my-3 justify-items-center">
                        <Avatar
                            position={"relative"}
                            src={
                                editImage
                                    ? URL.createObjectURL(editImage)
                                    : userInfo?.profile
                            }
                            name={editName}
                            size={"xl"}
                            rounded={"md"}
                            mb={4}
                        />
                        <div className=" xl:col-span-2">
                            <Text fontSize={"2xl"}>{userInfo?.name}</Text>
                            <Text fontSize={"md"} className="">
                                {" "}
                                {userInfo?.email}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
            <Mybookings />
        </div>
        // <div className="pt-20 pb-7 min-h-screen bg-red-500">
        //     <Stack direction={"column"} alignItems={"center"} spacing={4}>
        //         {isEdit ? (
        //             <>
        //                 {" "}
        //                 <Box className="relative">
        //                     <Avatar
        //                         position={"relative"}
        //                         src={
        //                             editImage
        //                                 ? URL.createObjectURL(editImage)
        //                                 : userInfo?.profile
        //                         }
        //                         name={editName}
        //                         size={"2xl"}
        //                     ></Avatar>
        //                     <div className="absolute bottom-3 -right-2 rounded-full bg-white w-[40px] h-[40px] flex justify-center items-center">
        //                         <PiCameraBold
        //                             size={25}
        //                             className="text-blue-800"
        //                             onClick={handleImgaeChange}
        //                         />
        //                     </div>
        //                     <input
        //                         type="file"
        //                         name=""
        //                         id="image"
        //                         ref={imageRef}
        //                         onChange={(e) => {
        //                             if (e.target.files && e.target.files[0]) {
        //                                 setEditImage(e.target.files[0]);
        //                             }
        //                         }}
        //                         hidden
        //                     />
        //                 </Box>
        //                 <Input
        //                     maxW={"400px"}
        //                     value={editName}
        //                     onChange={(e) => setEditName(e.target.value)}
        //                 />
        //                 <Flex>
        //                     <button
        //                         className="cursor-pointer bg-gray-300 p-2 text-gray-600 rounded-md flex items-center mx-2 hover:opacity-90"
        //                         onClick={() => {
        //                             setEditName(userInfo?.name as string);
        //                             setIsEdit(false);
        //                         }}
        //                     >
        //                         {" "}
        //                         <ImCancelCircle className="me-2" />
        //                         Cancel
        //                     </button>
        //                     <button
        //                         className="cursor-pointer bg-blue-600 p-2 text-white rounded-md flex items-center mx-2 hover:opacity-90"
        //                         onClick={handleSubmit}
        //                     >
        //                         {" "}
        //                         <FaRegSave className="me-2" />
        //                         Save
        //                     </button>
        //                 </Flex>
        //             </>
        //         ) : (
        //             <>
        //                 <Avatar
        //                     src={userInfo?.profile}
        //                     name={userInfo?.name}
        //                     size={"2xl"}
        //                 ></Avatar>
        //                 <Text fontSize={"2xl"} fontWeight={"bold"}>
        //                     {userInfo?.name}
        //                 </Text>
        //                 <Text fontSize={"1xl"} className="font-semibold">
        //                     {" "}
        //                     {userInfo?.email}
        //                 </Text>
        //                 <button
        //                     className="cursor-pointer bg-blue-600 p-2 text-white rounded-md flex items-center hover:opacity-90"
        //                     onClick={() => setIsEdit(true)}
        //                 >
        //                     {" "}
        //                     <FaRegEdit className="me-2" />
        //                     Edit
        //                 </button>
        //             </>
        //         )}

        //         <Tabs isLazy>
        //             <TabList>
        //                 <Tab>My bookings</Tab>
        //                 {/* <Tab>Schedules</Tab> */}
        //             </TabList>
        //             <TabPanels>
        //                 {/* initially mounted */}
        //                 <TabPanel>
        //                     <Mybookings />
        //                 </TabPanel>
        //                 {/* initially not mounted */}
        //                 <TabPanel>
        //                     <p>two!</p>
        //                 </TabPanel>
        //             </TabPanels>
        //         </Tabs>
        //     </Stack>
        // </div>
    );
};

export default UserProfile;
