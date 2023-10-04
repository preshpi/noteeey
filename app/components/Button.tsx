"use client";
import { NextPage } from "next";
import React from "react";
import { ButtonProps } from "../types/components";
import { useRouter } from "next/navigation";

const Button: NextPage<ButtonProps> = ({
  link,
  disabled,
  children,
  onClick,
  additionalClasses,
  ...props
}) => {
  const router = useRouter();

  return (
    <button
      className={`rounded-md px-6 py-2 ${additionalClasses || ""}`}
      onClick={(e) => {
        e.preventDefault();
        if (link) {
          router.push(link);
        } else if (onClick) {
          onClick(e);
        }
      }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
