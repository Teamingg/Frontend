"use client";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="h-[242px] bg-white flex flex-col justify-center items-center rounded-lg shadow-sm">
      <p className="text-lg mb-4">{error.message}</p>
      <button
        className="bg-primary text-white w-[150px] py-2 rounded-lg hover:bg-opacity-90 transition-colors"
        onClick={() => reset()}
      >
        새로고침
      </button>
    </div>
  );
};

export default Error;
