import React from 'react';
import {IoIosSearch} from "react-icons/io";

const Search = () => {
    return (
        <div className="w-full h-14">
            <form className="w-[650px] h-full m-auto p-3 border rounded-3xl flex">
                <input className="w-[600px] h-full" type="text"/>
                <button className="w-[50px] h-full text-2xl flex justify-center items-center" type="submit">
                    <IoIosSearch/>
                </button>
            </form>
        </div>
    );
};

export default Search;