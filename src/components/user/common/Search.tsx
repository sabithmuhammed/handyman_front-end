import React from "react";
import { FiSearch } from "react-icons/fi";

const Search = () => {
    return (
        <div className="w-full relative h-full ">
            <label
                htmlFor="search"
                className="absolute  flex h-full px-3 items-center "
            >
                <FiSearch size={25} />
            </label>
            <input
                type="search"
                name=""
                id="search"
                className="w-full h-full bg-slate-300 rounded-[20px] indent-11 shadow-md min-h-10"
                placeholder="Search..."
            />
        </div>
    );
};

export default Search;
