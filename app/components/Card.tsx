import { NextPage } from "next";
import React from "react";
import { Cardsprops } from "../types/components";

const Card: NextPage<Cardsprops> = ({ content, additionalClasses }) => {
  return (
    <div
      className={`${
        additionalClasses ? additionalClasses + " w-full" : "bg-[pink] border"
      }`}
    >
      {content}
    </div>
  );
};

export default Card;
