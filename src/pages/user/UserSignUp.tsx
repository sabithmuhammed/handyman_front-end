import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import { IoWarning } from "react-icons/io5";
import OtpForm from "../../components/user/signup/OtpForm";
import validator from "validator";
import { signup, verifyOtp } from "../../api/userApi";
import { toast } from "react-toastify";
import GoogleLogin from "../../components/user/signup/GoogleLogin";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const UserSignUp = () => {
    const { userInfo,adminInfo } = useSelector((state: RootState) => state.auth);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameErr, setNameErr] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passErr, setPassErr] = useState("");
    const [otp, setOtp] = useState("");
    const [otpErr, setOtpErr] = useState("");
    const [showOtp, setShowOtp] = useState(false);

    const navigate = useNavigate();

    const handleSignUpFormSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setNameErr("");
        setEmailErr("");
        setPassErr("");
        setName(name.trim());
        let hasError = false;
        if (!email) {
            setEmailErr("Email can't be empty.");
            hasError = true;
        } else if (!validator.isEmail(email)) {
            setEmailErr("Email Is badly formatted.");
            hasError = true;
        }
        const nameRegex =
            /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
        if (!name) {
            setNameErr("Name Can't be empty");
            hasError = true;
        }

        if (!password) {
            setPassErr("Please enter password");
            hasError = true;
        } else if (password.length < 6) {
            setPassErr("Password is too short. Minimum 6 Charecters required");
            hasError = true;
        }
        if (hasError) {
            return;
        }
        const response = await signup({ email, name: name.trim() });
        if (response) {
            setShowOtp((s) => !s);
        }
    };

    const handleVerifyOtpForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOtpErr("");
        if (!otp) {
            setOtpErr("Enter the otp.");
        } else if (otp.length !== 6) {
            setOtpErr("Invalid otp. Otp is 6 digits long.");
        }
        if (otpErr) {
            return;
        }
        const response = await verifyOtp({ email, name, password, otp });
        if (response) {
            console.log(response);

            if (response.data.status === "success") {
                toast.success(
                    "Account successfully verified! Please try login"
                );
                navigate("/login");
            } else {
                setOtpErr(response.data.message);
            }
        }
    };
    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
        if(adminInfo){
            navigate("/admin");
        }
    }, []);
    return (
        <div className="w-ful h-dvh flex justify-center items-center bg-slate-200">
            {!showOtp ? (
                <form
                    className="w-[350px]  rounded-md shadow-xl  p-7 flex flex-col items-center bg-white  ease-in-out delay-[10s] transition-height"
                    onSubmit={handleSignUpFormSubmit}
                >
                    <Link to="/" className="mb-5">
                        <img src={logoImg} width="150" alt="" />
                    </Link>
                    <h1 className="text-2xl font-bold text-indigo-950">
                        Sign up
                    </h1>
                    <div className=" w-full my-5 relative">
                        <input
                            type="text"
                            className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                            placeholder=""
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label
                            htmlFor="name"
                            className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                        >
                            Full name
                        </label>
                        {nameErr && (
                            <p className="text-sm text-red-500">{nameErr}</p>
                        )}
                    </div>
                    <div className=" w-full my-5 relative">
                        <input
                            type="email"
                            className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                            placeholder=""
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label
                            htmlFor="email"
                            className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                        >
                            Email
                        </label>
                        {emailErr && (
                            <p className="text-sm text-red-500">{emailErr}</p>
                        )}
                    </div>
                    <div className="w-full my-5 relative">
                        <input
                            type="password"
                            className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                            placeholder=""
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label
                            htmlFor="password"
                            className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                        >
                            Password
                        </label>
                        {passErr && (
                            <p className="text-sm text-red-500">{passErr}</p>
                        )}
                    </div>
                    <button className="bg-gradient-to-r from-indigo-950 to-indigo-700 text-white w-full h-10 rounded-full my-5 hover:from-indigo-700 hover:to-indigo-700 transition-all delay-[3s] ease-in">
                        Sign up
                    </button>
                    <p className="text-indigo-950 font-bold">OR</p>
                    <GoogleLogin />
                    <Link
                        to="/login"
                        className=" text-indigo-950 underline hover:text-indigo-900 "
                    >
                        Log in
                    </Link>
                </form>
            ) : (
                <OtpForm
                    {...{
                        otp,
                        setOtp,
                        otpErr,
                        handleVerifyOtpForm,
                        email,
                        name,
                    }}
                />
            )}
        </div>
    );
};

export default UserSignUp;
