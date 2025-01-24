import LoadingIndicator from "@/components/common/LoadingIndicator";
import React from "react";

const UserInfoFallback = () => {
  return (
    <div className="flex justify-center items-center h-[243px] w-[921px] rounded-lg mb-4 bg-white">
      <LoadingIndicator />
    </div>
  );
};

export default UserInfoFallback;
