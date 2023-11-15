import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse justify-center flex flex-wrap space-y-5 items-center gap-5">
      <div className=" bg-gray-400  lg:w-[400px] md:w-[300px] w-[250px] h-[250px] mx-auto rounded-[30px] shadow-lg"></div>
      <div className=" mb-2 bg-gray-400 lg:w-[400px] md:w-[300px] w-[250px] h-[250px] mx-auto rounded-[30px] shadow-lg"></div>
    </div>
  );
};

export default SkeletonLoader;
