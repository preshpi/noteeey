"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  // Calculate the position of the white circle within the parent circle
  const parentCircleRadius = 50; // Adjust this based on your design

  // Check if window is defined before accessing mousePosition
  const deltaX = typeof window !== "undefined" ? mousePosition.x - window.innerWidth / 2 : 0;
  const deltaY = typeof window !== "undefined" ? mousePosition.y - window.innerHeight / 2 : 0;

  const angle = Math.atan2(deltaY, deltaX);
  const whiteCircleX = typeof window !== "undefined" ? Math.cos(angle) * parentCircleRadius : 0;
  const whiteCircleY = typeof window !== "undefined" ? Math.sin(angle) * parentCircleRadius : 0;
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
              <span className="rounded-full p-1 absolute"></span>
            </span>
          </span>
        </span>
        <span className="text-[200px]">4</span>
      </div>
      <h2 className="dark:text-white text-black font-semibold text-3xl">
        This Page does not exist
      </h2>
      <Link
        href="/"
        className="dark:text-white dark:hover:text-slate-300 underline transition-colors duration-300"
      >
        Return Home
      </Link>
    </div>
  );
}
