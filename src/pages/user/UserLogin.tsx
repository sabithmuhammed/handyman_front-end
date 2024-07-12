import React, { useEffect, useState } from "react";
import { IoWarning } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import { login } from "../../api/commonApi";
import isEmail from "validator/lib/isEmail";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin, loginUser } from "../../redux/slice/authSlice";
import GoogleLogin from "../../components/user/signup/GoogleLogin";
import { RootState } from "../../redux/store";

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passErr, setPassErr] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo, adminInfo } = useSelector(
        (state: RootState) => state.auth
    );

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEmailErr("");
        setPassErr("");
        let hasError = false;
        if (!email) {
            setEmailErr("Please enter your email id.");
            hasError = true;
        } else if (!isEmail(email)) {
            setEmailErr("Email is badly formatted.");
            hasError = true;
        }

        if (!password) {
            setPassErr("Please enter your password.");
            hasError = true;
        } else if (password.length < 6) {
            setPassErr("Password is too short. Must be 6 charecters long.");
            hasError = true;
        }
        if (hasError) {
            return;
        }

        const response = await login({ email, password });
        if (response?.data) {
            if (response.data.isAdmin) {
                dispatch(loginAdmin({ ...response.data }));
                navigate("/admin/verify");
            } else {
                dispatch(loginUser({ ...response.data }));
                navigate("/");
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
        
        <div className="w-ful h-dvh flex justify-center items-center bg-slate-200 ">
            <form
                className="w-[350px]  rounded-md shadow-xl  p-7 flex flex-col items-center bg-white"
                onSubmit={handleFormSubmit}
            >
                <Link to="/" className="mb-5">
                    <img src={logoImg} width="150" alt="" />
                </Link>
                <h1 className="text-2xl font-bold text-indigo-950">Log in</h1>
                <div className=" w-full my-5 relative">
                    <input
                        type="text"
                        className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                        placeholder=""
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.trim())}
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
                        onChange={(e) => setPassword(e.target.value.trim())}
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

                    <Link to={"/forgot-password"} className="mt-3 text-indigo-400 hover:text-indigo-500 cursor-pointer">
                        Forgot password?
                    </Link>
                </div>
                <button className="bg-gradient-to-r from-indigo-950 to-indigo-700 text-white w-full h-10 rounded-full my-5 hover:from-indigo-700 hover:to-indigo-700 transition-colors delay-1000 ease-in">
                    Log in
                </button>
                <p className="text-indigo-950 font-bold">OR</p>
                <GoogleLogin />
                <Link
                    to="/signup"
                    className="text-indigo-950 underline hover:text-indigo-900 "
                >
                    Sign up
                </Link>
            </form>
        </div>
    );
};

export default UserLogin;
