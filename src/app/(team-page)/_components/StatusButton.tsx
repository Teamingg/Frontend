import React from 'react';

const StatusButton = ({status}: string) => {
    return (
        <div className="status-container flex justify-end">
            <button className="status-button bg-blue-500 text-white py-2 px-4 rounded">{status === "RECRUTING" ? "모집 마감" : "모집중"}</button>
        </div>
    );
};

export default StatusButton;