import React from "react";
import { useAppContext } from "../context/AppContext";

const ColorPicker = () => {
  const { color, setColor } = useAppContext();

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedColor = event.target.value;
    localStorage.setItem("selectedColor", selectedColor);
    setColor(selectedColor);
  };

  return (
    <div className="flex flex-col items-center dark:text-[#fff] text-text gap-3">
      <label
        htmlFor="favcolor"
        className="text-[#131313] dark:text-[#FFFF] text-[14px]"
      >
        Select your favorite color
      </label>

      <input
        type="color"
        id="favcolor"
        name="favcolor"
        value={color || "#131313"}
        onChange={handleColorChange}
        className="rounded-md"
      />
    </div>
  );
};

export default ColorPicker;
