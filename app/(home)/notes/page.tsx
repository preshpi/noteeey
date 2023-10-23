"use client";
import ProtectedRoute from "@/app/ProtectedRoute";
import Card from "@/app/components/Card";
import Input from "@/app/components/Input";
import TopBar from "@/app/components/TopBar";
import { RootState } from "@/app/store/store";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";
const Notes = () => {
  const user = useSelector((state: RootState) => state.user.user);
  

  const [color, setColor] = useState("#FFFF");
  const handlerandomColor = () => {
    const randomColors =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    setColor(randomColors);
  };
  const CardData = [
    {
      id: 1,
      text: "one",
    },
    {
      id: 2,
      text: "two",
    },
    {
      id: 3,
      text: "three",
    },
  ];
  return (
    <ProtectedRoute>
      <TopBar />
      <section className="flex flex-col gap-6 items-center justify-center mt-8 px-2 w-full">
        <h2 className="lg:text-5xl text-3xl text-center font-bold text-[#e6e4e4]">
          <span className="text-[blue]">Create</span> Quick Access{" "}
          <span className="text-[green] italic">Sticky</span> Notes{" "}
        </h2>
      </section>
      <section className="flex items-center justify-center mt-8">
        <div className="flex items-center justify-center lg:w-[500px] md:w-[500px] border border-gray-300 text-[#e6e4e4] rounded-lg focus-within:shadow-md">
          <span className="px-3 py-3 text-xl">
            <BiSearch />
          </span>
          <Input
            type="search"
            id="search"
            value=""
            onChange={() => console.log("search")}
            required
            autoComplete="off"
            name="search"
            placeholder="Search here..."
          />
        </div>
      </section>
      <section className="flex items-center flex-wrap gap-8 justify-center pt-24">
        {CardData.map((index: any) => (
          <Card content="I'm a card" key={index} />
        ))}
      </section>
    </ProtectedRoute>
  );
};

export default Notes;
