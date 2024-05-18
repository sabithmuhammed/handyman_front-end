import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { signupGoogle } from "../../../api/userApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
    const [user, setUser] = useState<{ access_token: string } | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getGoogleInfo = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log("Login Failed:", error),
    });

    useEffect(() => {
        (async () => {
            try {
                if (user) {
                    const res = await axios.get(
                        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
                        {
                            headers: {
                                Authorization: `Bearer ${user.access_token}`,
                                Accept: "application/json",
                            },
                        }
                    );
                    if (res.data) {
                        const { name, id, email } = res.data;
                        const response = await signupGoogle({
                            name,
                            id,
                            email,
                        });

                        if (response?.data) {
                            dispatch(loginUser({ ...response.data }));
                            navigate("/");
                        }
                    }
                }
            } catch (error) {
                toast.error(error.response.data);
            }
        })();
    }, [user]);
    return (
        <button
            className="w-full text-indigo-950 border-2 border-indigo-950 my-5 h-10 rounded-full flex justify-center items-center hover:bg-indigo-400"
            type="button"
            onClick={() => getGoogleInfo()}
        >
            <FaGoogle size={20} /> <p className="ms-3">Signup with google</p>
        </button>
    );
};

export default GoogleLogin;
