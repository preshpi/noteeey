"use client";
import { NextPage } from "next";
import React, { useState } from "react";
import { Cardsprops } from "../types/components";

const Card: NextPage<Cardsprops> = ({ content, additionalClasses }) => {
  // const randomColors = ["#1363DF", "#B931FC", "#FE7BE5", "#313866", "#35A29F", "#EA906C", "#917FB3", "#FF6000", "#F9DBBB","#810CA8"];
  // const [hoverColor, setHoverColor] = useState("");

  // const handleHoverColor = () => {
  //   const color = randomColors[Math.floor(Math.random() * randomColors.length)];
  //   setHoverColor(color);
  // }
  return (
    <div
      className={`bg-slate-50 rounded-xl cursor-pointer px-24 py-24 shadow-md hover:text-white transition-colors duration-500 ${
        additionalClasses || ""
      }`}
    >
      {content}
    </div>
  );
};

export default Card;
