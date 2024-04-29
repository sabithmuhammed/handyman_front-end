import React from "react";
import heroImg from "../../../assets/heroImg.jpg";
import { FaSearch } from "react-icons/fa";

const Hero = () => {
    return (
        <div className="w-full flex justify-center bg-blue-500 pb-5">
            <div className="min-h-[500px] w-full md:max-w-7xl md:px-3 grid md:grid-cols-3 md:pt-36 pt-28">
                <div className=" col-span-2  font-bold">
                    <h1 className="text-4xl text-white max-md:text-center max-md:text-3xl text-balance max-md:px-5">
                        Connect, Trade, Thrive:
                        <br /> Your One-Stop Tradesman Platform
                    </h1>
                    <p className="pt-3 font-normal text-white max-md:text-center max-md:px-5 text-balance text-xl">
                        Welcome to <span className="font-bold">Handyman</span> ,
                        where tradesmen and users converge to revolutionize the
                        way trades are done. Whether you're a skilled tradesman
                        seeking new opportunities or a user in need of expert
                        services and top-quality tools, our platform is your
                        gateway to seamless connections and unparalleled
                        convenience. Explore our extensive network of
                        professionals, rent premium power tools, and experience
                        a new era of trade synergy.
                    </p>
                    <form className="flex pt-5  justify-between max-md:w-svw  max-md:px-4 ">
                        <div className="h-11  grid grid-cols-8 shadow-xl max-md:w-full gap-x-0">
                            <select
                                name="category"
                                id=""
                                className="col-span-2 h-full rounded-s-xl max-sm:text-xs text-[14px] text-center"
                                
                            >
                                <option value="tools">Tools</option>
                                <option value="tradesmen">Tradesmen</option>
                            </select>
                            <input
                                type="text"
                                name="search"
                                className="h-full indent-2 pt-0 col-span-5"
                            />
                            <button className="bg-orange-500 flex justify-center items-center text-white rounded-e-xl col-span-1">
                                <FaSearch />
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-span-3 md:col-span-1 max-md:pt-5 max-md:px-4">
                    <div className="overflow-hidden rounded-xl h-80 shadow-xl">
                        <img
                            src={heroImg}
                            alt=""
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
