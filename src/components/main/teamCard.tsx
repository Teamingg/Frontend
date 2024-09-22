import React from 'react';
import {IoLogoJavascript} from "react-icons/io";

const TeamCard = () => {
    return (
        <div className="w-10/12 p-3 flex justify-between items-center">
            <div className="flex items-center justify-center gap-2">
                <div><IoLogoJavascript/></div>
                <div>project name</div>
            </div>
            <div>date</div>
        </div>
    );
};

export default TeamCard;