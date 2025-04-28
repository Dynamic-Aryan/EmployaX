import React from "react";

const Loading = () => {
  return (
    <div className="flex-col gap-4 w-full flex items-center justify-center mt-40">
      <div className="w-20 h-20 border-4 border-transparent text-amber-400 text-4xl animate-spin flex items-center justify-center border-t-amber-400 rounded-full">
        <div className="w-16 h-16 border-4 border-transparent text-orange-400 text-4xl animate-spin flex items-center justify-center border-t-orange-400 rounded-full"></div>
      </div>
    </div>
  );
};

export default Loading;