"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Calculate the position of the white circle within the parent circle
  const parentCircleRadius = 50; // Adjust this based on your design
  const deltaX = mousePosition.x - window.innerWidth / 2;
  const deltaY = mousePosition.y - window.innerHeight / 2;
  const angle = Math.atan2(deltaY, deltaX);
  const whiteCircleX = Math.cos(angle) * parentCircleRadius;
  const whiteCircleY = Math.sin(angle) * parentCircleRadius;

  return (
    <div className="items-center flex justify-center flex-col h-full gap-5">
      <div className="flex items-center text-[#e85444] gap-5">
        <span className="text-[200px]">4</span>
        <span className="flex items-center justify-center relative">
          <span
            className="bg-[#e85444] rounded-full p-20"
            style={{
              top: `calc(50% - 10px)`,
              left: `calc(50% - 10px)`,
            }}
          >
            <span
              className="bg-[black] rounded-full p-3 absolute"
              style={{
                top: `calc(50% - 15px + ${whiteCircleY}px)`,
                left: `calc(50% - 15px + ${whiteCircleX}px)`,
              }}
            >
              <span className="bg-[white] rounded-full p-1 absolute"></span>
            </span>
          </span>
        </span>
        <span className="text-[200px]">4</span>
      </div>
      <h2 className="text-white font-semibold text-3xl">
        This Page does not exist
      </h2>
      <Link href="/" className="text-white hover:text-slate-300 transition-colors duration-300">
        Return Home
      </Link>
    </div>
  );
}
