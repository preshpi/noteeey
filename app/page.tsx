import React from "react";
import Navbar from "./components/Navbar";
import Link from "next/link";
import Image from "next/image";
import Button from "./components/Button";

const Home = () => {
  return (
    <div className="bg-[#0a0815] min-h-screen">
      <Navbar />

      <section className="items-center justify-center flex mt-16 px-5 flex-col">
        <h1 className="text-[#FAF8FC] lg:text-[80px] md:text-[56px] text-[50px] font-bold text-center">
          Organize Your Ideas with Sticky Notes{" "}
          <span className="text-[#e85444]">Online</span>
        </h1>
        <p className="mt-5 text-gray-50 font-[300] text-center text-[17px] lg:text-[20px]">
         Noteey is an online tool for taking notes. You can create, edit, delete and share notes.
        </p>

        <Button link="/notes" additionalClasses="mt-12 text-slate-50 bg-[#e85444] px-10 py-3 rounded-2xl animate-pulse ring-8 ring-[#f6695a]">Create a note</Button>
      </section>
    </div>
  );
};

export default Home;
