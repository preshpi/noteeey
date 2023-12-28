"use client";
import { NextPage } from "next";
import React, { useState } from "react";
import { inputprops } from "../types/components";

const Input: NextPage<inputprops> = ({
  label,
  value,
  name,
  id,
  type,
  additionalClasses,
  placeholder,
  onChange,
  additionalAttributes,
  pattern,
  disabled,
  required,
  minLength,
  maxLength,
  autoComplete,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="w-full">
      <label className="text-left font-semibold capitalize text-blue-950">
        {label}
      </label>
      <input
        name={name}
        id={id}
        value={value}
        className={`${
          additionalClasses
            ? additionalClasses + "w-full"
            : "h-10 w-full rounded-md border text-black bg-transparent px-4 py-3 text-[15px] font-light outline-none md:placeholder-text"
        }`}
        type={!visible ? type : "text"}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete={autoComplete}
        pattern={pattern}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        {...additionalAttributes}
      />
    </div>
  );
};

export default Input;
