import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import { IoWarning } from "react-icons/io5";
import OtpForm from "../../components/user/signup/OtpForm";
import validator from "validator";
import { forgotChangePassword, forgotVerifyMail, forgotVerifyOtp, signup, verifyOtp } from "../../api/userApi";
import { toast } from "react-toastify";
import GoogleLogin from "../../components/user/signup/GoogleLogin";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import isEmail from "validator/lib/isEmail";

const ForgotPassword = () => {
    const { userInfo, adminInfo } = useSelector(
        (state: RootState) => state.auth
    );

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passErr, setPassErr] = useState("");
    const [cpassErr, setCpassErr] = useState("");
    const [otp, setOtp] = useState("");
    const [otpErr, setOtpErr] = useState("");
    const [showOtp, setShowOtp] = useState(false);
    const [isVerified, setIsverified] = useState(false);

    const navigate = useNavigate();

    const verifyEmail = async () => {
        setEmailErr("");
        let hasError = false;
        if (!email) {
            setEmailErr("Please enter your email id.");
            hasError = true;
        } else if (!isEmail(email)) {
            setEmailErr("Email is badly formatted.");
            hasError = true;
        }
        if (hasError) {
            return;
        }
        const res = await forgotVerifyMail(email);
        if (res?.data) {
            setName(res.data.name);
            setShowOtp(true);
        }
    };

    const changePassword = async () => {
        setPassErr("");
        setCpassErr("");
        setName(name.trim());
        let hasError = false;
        if (!password) {
            setPassErr("Please enter password");
            hasError = true;
        } else if (password.length < 6) {
            setPassErr("Password is too short. Minimum 6 Charecters required");
            hasError = true;
        }
        if (password !== confPassword) {
            setCpassErr("Password doesn't match");
            hasError = true;
        }
        if(hasError){
            return;
        }
        const res = await forgotChangePassword({email,otp,password});
        if(res?.data){
            
            if(res.data.status == "success"){
                toast.success("Password changed successfully")
                navigate('/login');
            }else{
                toast.error("Error occured while changing password")
            }
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
        const response = await forgotVerifyOtp({ email, otp });
        if (response) {
            console.log(response);

            if (response.data.status === "success") {
                toast.success(
                    "Account successfully verified! Please change your password"
                );
                setIsverified(true);
                setShowOtp(false);
            } else {
                setOtpErr(response.data.message);
            }
        }
    };
    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
        if (adminInfo) {
            navigate("/admin");
        }
    }, []);
    return (
        <div className="w-ful h-dvh flex justify-center items-center bg-slate-200">
            {!showOtp ? (
                <div className="w-[350px]  rounded-md shadow-xl  p-7 flex flex-col items-center bg-white  ease-in-out delay-[10s] transition-height">
                    <Link to="/" className="mb-5">
                        <img src={logoImg} width="150" alt="" />
                    </Link>

                    <h1 className="text-2xl font-bold text-indigo-950">
                        {!isVerified
                            ? "Enter your email"
                            : "Enter new password"}
                    </h1>
                    {!isVerified ? (
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
                                <p className="text-sm text-red-500">
                                    {emailErr}
                                </p>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="w-full my-5 relative">
                                <input
                                    type="password"
                                    className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                                    placeholder=""
                                    id="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <label
                                    htmlFor="password"
                                    className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                                >
                                    Password
                                </label>
                                {passErr && (
                                    <p className="text-sm text-red-500">
                                        {passErr}
                                    </p>
                                )}
                            </div>

                            <div className="w-full my-5 relative">
                                <input
                                    type="password"
                                    className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                                    placeholder=""
                                    id="cpassword"
                                    value={confPassword}
                                    onChange={(e) =>
                                        setConfPassword(e.target.value)
                                    }
                                />
                                <label
                                    htmlFor="cpassword"
                                    className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                                >
                                    Confirm Password
                                </label>
                                {cpassErr && (
                                    <p className="text-sm text-red-500">
                                        {cpassErr}
                                    </p>
                                )}
                            </div>
                        </>
                    )}

                    <button
                        className="bg-gradient-to-r from-indigo-950 to-indigo-700 text-white w-full h-10 rounded-full my-5 hover:from-indigo-700 hover:to-indigo-700 transition-all delay-[3s] ease-in"
                        onClick={() => {
                            if (!isVerified) {
                                verifyEmail();
                            } else {
                                changePassword();
                            }
                        }}
                    >
                        {!isVerified ? "Send OTP" : "Change password"}
                    </button>
                </div>
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

export default ForgotPassword;
