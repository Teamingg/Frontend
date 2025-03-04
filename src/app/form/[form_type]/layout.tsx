import React from "react";

const CreateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full sm:py-14 sm:px-48 md:px-28">
      <div className="bg-[#f5f5f5] rounded-lg p-8">{children}</div>
    </section>
  );
};

export default CreateLayout;
