import React from 'react';
import {IoLogoJavascript} from "react-icons/io";

const TeamCard = () => {
    return (
        <div className="w-11/12 m-auto my-3 p-3 flex justify-between items-center border border-black">
            <div className="flex items-center justify-center gap-2">
                <div><IoLogoJavascript/></div>
                <div>project name</div>
            </div>
            <div>date</div>
        </div>
    );
};

export default TeamCard;