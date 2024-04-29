import React from "react";
import logo from "../../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import navItems from "../../constants/navItems";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <header className=" w-full h-20 max-w-7xl md:mt-5 md:px-3 fixed">
            <nav className="w-full h-full md:rounded-3xl flex justify-between px-5 items-center shadow-xl bg-blue-500" >
                <div className="">
                    <img src={logo} alt="" />
                </div>
                <button className="rounded-full bg-white px-5 py-2 text-xl max-sm:text-xs">
                    Register as a tradesmen
                </button>
                <ul className="max-md:hidden flex">
                  {navItems.map((item=>(
                    <li><NavLink to={item.link} className='mx-5 text-white font-medium text-xl'>{item.title}</NavLink></li>
                  )))}
                  
                  <li><NavLink to='/login' className='mx-5 text-white font-medium text-xl'>Login</NavLink></li>
                </ul>
                <div className="md:hidden">
                    <GiHamburgerMenu size={40} color={"white"} />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
