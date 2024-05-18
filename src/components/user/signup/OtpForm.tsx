import React, { useEffect, useRef, useState } from "react";
import logoImg from "../../../assets/logo.png"
import { IoWarning } from "react-icons/io5";
import { resentOtp } from "../../../api/userApi";
import { toast } from "react-toastify";
type childType = {
    otp: string;
    setOtp: React.Dispatch<React.SetStateAction<string>>;
    otpErr: string;
    handleVerifyOtpForm:(e: React.FormEvent<HTMLFormElement>) => Promise<void>,
    email:string,
    name:string
};

const OtpForm = ({ otp, setOtp, otpErr,handleVerifyOtpForm,email,name }: childType) => {
    const Ref = useRef<number | null>(null);
    const [timer, setTimer] = useState("01:00");
 
    const getTimeRemaining = (e:string) => {
        const total =
            Date.parse(e) - Date.parse(new Date() as unknown as string);
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor(
            (total / 1000 / 60) % 60
        );
        return {
            total,
            minutes,
            seconds,
        };
    };
 
    const startTimer = (e:string) => {
        let { total, minutes, seconds } =
            getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (minutes > 9
                    ? minutes
                    : "0" + minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds)
            );
        }
    };
 
    const clearTimer = (e:string) => {
        setTimer("01:00");
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };
 
    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 60);
        return deadline as unknown as string;
    };
 
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);
 
    const resend = async () => {
        if(timer == "00:00"){
            await resentOtp({email,name})
            toast.success("OTP sent successfully")
            clearTimer(getDeadTime());
        }
    };

    return (
        <form className="w-[350px]  rounded-md shadow-xl  p-7 flex flex-col items-center bg-white  ease-in-out delay-[10s] transition-height" onSubmit={handleVerifyOtpForm}>
            <div className="mb-5">
                        <img src={logoImg} width="150" alt="" />
                    </div>
            <h1 className="text-2xl font-bold text-indigo-950 mb-5">
                OTP verification
            </h1>
            <p className="text-center text-indigo-600">
                We've sent you an otp to your email id. Please verify your
                account with the given otp
            </p>
            <div className="mb-10 mt-10 w-full flex flex-col relative">
                <input
                    type="text"
                    className="border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                    id="otp"
                    placeholder=""
                    value={otp}
                    onChange={(e)=>setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                />
                <label
                    htmlFor="otp"
                    className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                >
                    OTP
                </label>
                {otpErr && (
                    <p className="text-sm text-red-500">
                         {otpErr}
                    </p>
                )}
            </div>
            <p className="text-indigo-950">Havn't received otp? <span className={`font-bold ${timer == "00:00"?"opacity-100 cursor-pointer":"opacity-80 cursor-not-allowed"} ` } onClick={resend}>Resend {timer == "00:00"?"":`in ${timer}`}</span></p>
            <button className="bg-gradient-to-r from-indigo-950 to-indigo-700 text-white w-full h-10 rounded-full my-5 hover:from-indigo-700 hover:to-indigo-700 transition-all delay-[3s] ease-in">
                Verify
            </button>
        </form>
    );
};

export default OtpForm;
