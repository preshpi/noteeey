import { NextPage } from "next";
import React, { useEffect } from "react";
import { OverlayProps } from "../types/components";

const Overlay: NextPage<OverlayProps> = ({
  children,
  show,
  setShow,
  modalRef,
  ...props
}) => {
  useEffect(() => {
    // Prevent scrolling on the body when the overlay is shown
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Handle click outside of the modal to close it
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, setShow, show]);
  return (
    <div {...props}>
      {show && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {children}
        </div>
      )}
    </div>
  );
};

export default Overlay;
