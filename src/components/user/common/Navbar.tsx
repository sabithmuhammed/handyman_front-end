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
import { logoutUser } from "../../../redux/slice/authSlice";

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
            console.log(response);

            toast.success(response?.data?.data?.message);
            dispatch(logoutUser());
        }
    };
    return (
        <header className="w-[1280px] h-20 mx-auto bg-white fixed top-0 rounded-b-3xl z-10">
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
        // <header className=" w-full h-20 max-w-7xl md:mt-5 md:px-3 fixed select-none z-10">
        //     <nav className="w-full h-full lg:rounded-3xl flex justify-between px-5 items-center shadow-xl bg-blue-500">
        //         <div className="">
        //             <img src={logo} alt="" />
        //         </div>
        //         <button className="rounded-full bg-white px-5 py-2 text-xl max-sm:text-xs">
        //             {userInfo?.isTradesman?"Go to your Dashboard" :"Register as a Tradesman"}
        //         </button>
        //         <ul className="max-lg:hidden flex">
        //             {navItems.map((item) => (
        //                 <li key={item.title}>
        //                     <NavLink
        //                         to={item.link}
        //                         className={({ isActive, isPending }) =>
        //                             `mx-5 font-medium text-xl px-3 flex items-center py-1 ${
        //                                 isPending
        //                                     ? "text-orange-500 bg-white rounded-2x"
        //                                     : isActive
        //                                     ? "text-orange-500 bg-white rounded-2xl"
        //                                     : " text-white"
        //                             }`
        //                         }
        //                     >
        //                         {item.title}
        //                     </NavLink>
        //                 </li>
        //             ))}

        //             <li>
        //                 {userInfo ? (
        //                     <div className=" flex mx-5 items-center">
        //                         <div className="w-9 h-9 bg-red-500 rounded-full overflow-hidden border-2 flex-shrink-0">
        //                             <img src={avatar} className="" alt="" />
        //                         </div>
        //                         <div
        //                             className="mx-5 text-white font-medium text-xl flex items-center cursor-pointer relative "
        //                             onClick={() => setProfileToggle((p) => !p)}
        //                         >
        //                             {userInfo.name}{" "}
        //                             {profileToggle ? (
        //                                 <RiArrowUpSLine />
        //                             ) : (
        //                                 <RiArrowDownSLine />
        //                             )}
        //                             {profileToggle && (
        //                                 <div className="absolute top-full mt-2 right-0 w-40 h-20 bg-white rounded-md shadow-md flex flex-col items-center justify-around">
        //                                     <Link
        //                                         to="/profile"
        //                                         className=" text-black font-normal"
        //                                     >
        //                                         Profile
        //                                     </Link>
        //                                     <button
        //                                         className=" text-white font-normal flex items-center bg-red-500 px-2 py-1 rounded-md"
        //                                         onClick={logOut}
        //                                     >
        //                                         {" "}
        //                                         <RiLogoutCircleLine /> Logout
        //                                     </button>
        //                                 </div>
        //                             )}
        //                         </div>
        //                     </div>
        //                 ) : (
        //                     <NavLink
        //                         to="/login"
        //                         className="mx-3 text-white font-medium text-xl flex items-center py-1"
        //                     >
        //                         Login
        //                     </NavLink>
        //                 )}
        //             </li>
        //         </ul>

        //         <div className="lg:hidden" onClick={showNav}>
        //             <GiHamburgerMenu size={40} color={"white"} />
        //         </div>
        //     </nav>
        //     <aside
        //         className={`lg:hidden h-dvh w-dvw  absolute z-100  top-0 fill-transparent duration-500 ${
        //             nav ? `left-0` : `-left-full`
        //         }`}
        //     >
        //         <div
        //             className={`w-full h-full absolute max-w-[350px] bg-white text-black duration-500 ease-in-out transition-all flex flex-col p-5 ${
        //                 nav ? `left-0` : `-left-full`
        //             }`}
        //         >
        //             <div className=" self-end" onClick={hideNav}>
        //                 <MdClose size={40} />
        //             </div>
        //             <ul className="flex flex-col">
        //                 {navItems.map((item) => (
        //                     <li key={item.title} className="mb-5">
        //                         <NavLink
        //                             to={item.link}
        //                             className={({ isActive, isPending }) =>
        //                                 ` font-normal text-xl ${
        //                                     isPending
        //                                         ? "text-orange-500"
        //                                         : isActive
        //                                         ? "text-orange-500"
        //                                         : " text-black"
        //                                 }`
        //                             }
        //                         >
        //                             {item.title}
        //                         </NavLink>
        //                     </li>
        //                 ))}

        //                 <li>
        //                     {userInfo ? (
        //                         <>
        //                             <NavLink
        //                                 to="/login"
        //                                 className="text-black font-normal text-xl"
        //                             >
        //                                 {userInfo.name + " / Profile"}
        //                             </NavLink>
        //                             <button
        //                                 className=" text-white font-normal flex items-center bg-red-500 px-2 py-1 rounded-md mt-5"
        //                                 onClick={logOut}
        //                             >
        //                                 {" "}
        //                                 <RiLogoutCircleLine /> Logout
        //                             </button>
        //                         </>
        //                     ) : (
        //                         <NavLink
        //                             to="/login"
        //                             className="text-black font-normal text-xl"
        //                         >
        //                             Login
        //                         </NavLink>
        //                     )}
        //                 </li>
        //             </ul>
        //         </div>
        //     </aside>
        // </header>
    );
};

export default Navbar;
