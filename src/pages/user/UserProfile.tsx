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
import { ProfileTile } from "../../components/user/profile/ProfileTile";

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
            <ProfileTile />
            <Mybookings />
        </div>
       
    );
};

export default UserProfile;
