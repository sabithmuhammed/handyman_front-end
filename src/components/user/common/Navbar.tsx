import React, { useRef, useState } from "react";
import logo from "../../../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { navItems } from "../../../constants/pagesConstants";
import { Link, NavLink } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import avatar from "../../../assets/avatar2.png";
import {
    RiArrowUpSLine,
    RiArrowDownSLine,
    RiLogoutCircleLine,
} from "react-icons/ri";
import { logout } from "../../../api/commonApi";
import { toast } from "react-toastify";
import { logoutUser, removeTradesman } from "../../../redux/slice/authSlice";

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [profileToggle, setProfileToggle] = useState(false);

    const { userInfo } = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch();

    const showNav = () => {
        setNav(true);
    };
    const hideNav = () => {
        setNav(false);
    };
    const logOut = async () => {
        const response = await logout();
        if (response) {

            toast.success(response?.data?.data?.message);
            dispatch(logoutUser());
            dispatch(removeTradesman());
        }
    };
    return (
        <header className="w-[1280px] h-20 mx-auto bg-white fixed top-0 rounded-b-3xl z-50">
            <nav className="w-full h-full flex items-center px-4 justify-between rounded-3xl bg-white shadow-xl">
                <Link to="/" className="logo">
                    <img src={logo} width="150" alt="" />
                </Link>
                <Link to={"/tradesman/register"} className="rounded-full bg-yellow-200 px-3">Register as a tradesman</Link>
                <ul className="flex text-indigo-950 select-none">
                    {navItems.map((item) => (
                        <li key={item.title} className="mx-4">
                            <NavLink
                                to={item.link}
                                className={({ isActive, isPending }) =>
                                    `cursor-pointer ${
                                        isPending
                                            ? "underline"
                                            : isActive
                                            ? "underline"
                                            : "no-underline"
                                    }`
                                }
                            >
                                {item.title}
                            </NavLink>
                        </li>
                    ))}

                    {!userInfo ? (
                        <li className="mx-4 rounded-full bg-indigo-950 text-white px-3">
                            <Link to="/login">Login</Link>
                        </li>
                    ) : (
                        <div className=" flex mx-4 items-center">
                            <div className="w-7 h-7 bg-red-500 rounded-full overflow-hidden border-2 flex-shrink-0">
                                <img src={avatar} className="" alt="" />
                            </div>
                            <div
                                className="mx-2    flex items-center cursor-pointer relative "
                                onClick={() => setProfileToggle((p) => !p)}
                            >
                                {userInfo.name}{" "}
                                {profileToggle ? (
                                    <RiArrowUpSLine />
                                ) : (
                                    <RiArrowDownSLine />
                                )}
                                {profileToggle && (
                                    <div className="absolute top-full mt-2 right-0 w-40 h-20 bg-white rounded-md shadow-md flex flex-col items-center justify-around">
                                        <Link
                                            to="/profile"
                                            className=" text-indigo-950 font-normal"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            className=" text-white font-normal flex items-center bg-red-500 px-2 py-1 rounded-md"
                                            onClick={logOut}
                                        >
                                            {" "}
                                            <RiLogoutCircleLine /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </ul>
            </nav>
        </header>
        
    );
};

export default Navbar;
