import React from 'react';
import {FaRedo, FaTimes} from "react-icons/fa";

const InvitationList = ({ invitations }) => {
  return (
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">초대 중인 멤버</h2>

        {invitations.map((invite, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
              <div>
                <p className="text-sm font-medium">{invite.email}</p>
                <p className="text-xs text-gray-500">{invite.date} 초대됨</p>
              </div>
              <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">{invite.role}</span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 flex items-center">
                  <FaRedo className="mr-1" /> 재발송
                </button>
                <button className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 flex items-center">
                  <FaTimes className="mr-1" /> 취소
                </button>
              </div>
            </div>
        ))}
      </div>
  );
};

export default InvitationList;