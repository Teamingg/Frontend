import React from "react";

const SlugItem = () => {
  return (
    <div className=" bg-white shadow-sm p-4 rounded-lg">
      <div className="flex justify-between mb-4">
        <p>
          <time dateTime="2024-11-11">2024.11.11</time>
          <span>~</span>
          <time dateTime="2025-02-11">2025.02.11</time>
        </p>
        <p>category</p>
      </div>
      <h3 className="mb-2">title</h3>
      <p className="mb-2">content</p>
      <div className="flex justify-between">
        <p>tag</p>
        <p>team name</p>
      </div>
    </div>
  );
};

export default SlugItem;
