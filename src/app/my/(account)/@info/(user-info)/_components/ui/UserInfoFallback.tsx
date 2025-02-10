import LoadingIndicator from "@/components/common/LoadingIndicator";
import React from "react";

const UserInfoFallback = () => {
  return (
    <div className="flex items-center justify-center h-[312px] md:h-[243px] w-full rounded-lg mb-4 bg-white">
      <LoadingIndicator />
    </div>
  );
};

export default UserInfoFallback;
