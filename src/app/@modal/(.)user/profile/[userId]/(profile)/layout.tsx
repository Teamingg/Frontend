import React from "react";

interface UserProfileLayoutProps {
  params: Promise<{ userId: string }>;
  info: React.ReactNode;
  reviews: React.ReactNode;
}

const UserProfileLayout = async ({ info, reviews }: UserProfileLayoutProps) => {
  return (
    <>
      <div className="py-4">{info}</div>
      <div>{reviews}</div>
    </>
  );
};

export default UserProfileLayout;
