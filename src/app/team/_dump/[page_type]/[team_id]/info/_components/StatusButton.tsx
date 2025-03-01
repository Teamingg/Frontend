import React from 'react';

interface StatusBtn {
    status: string;
}

const StatusButton = ({status}: StatusBtn) => {
    return (
        <div className="hidden sm:flex justify-end">
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              {status === "RECRUTING" ? "모집 마감" : "모집중"}
            </button>
        </div>
    );
};

export default StatusButton;