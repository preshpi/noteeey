"use client";
import { NextPage } from "next";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { Cardsprops } from "../types/components";
import DeleteModal from "./Modals/DeleteModal";
import EditModal from "./Modals/EditModal";
import { IoMdMore } from "react-icons/io";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Link from "next/link";
import { FaLink } from "react-icons/fa6";
import { useAppContext } from "../context/AppContext";
import { toast } from "sonner";
import Draggable from "react-draggable";
import useModalAnimation from "./Modals/useModalAnimation";

const Card: NextPage<Cardsprops> = ({
  content,
  date,
  handleDeleteCard,
  handleUpdateDoc,
  id,
  viewMode,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [moreModal, setMoreModal] = useState(false);

  const handleDeleteModal = () => {
    setShowModal(true);
  };
  const handleEditModal = () => {
    setShowEditModal(true);
  };
  const urlToCopy = `https://noteeey.vercel.app/notes/${id}`;

  const handleCopyNote = () => {
    toast.success("Copied note!");
  };

  const modalRef = useRef<HTMLDivElement>(null);
  const handleClickOutsideModal = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setMoreModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  const { color } = useAppContext();
  const borderStyle = color ? { borderLeftColor: color } : {};

  const animateCom = useRef(null);
  useModalAnimation(animateCom);

  return (
    <section className="w-full" ref={animateCom}>
      <Draggable scale={1}>
        <div
          className={`dark:bg-[#232323] bg-gray-200 mb-4 rounded-lg border-l-4 cursor-move space-y-3 shadow-md
         ${viewMode === "grid" ? "w-[264px] p-4" : "w-full p-2"}`}
          style={borderStyle}
        >
          <div id="card" className="flex justify-between gap-2 items-center">
            <Link href={`/notes/${id}`}>
              <h2 className="text-xl font-semibold cursor-pointer hover:opacity-80 dark:text-[#D6D6D6] text-black transition-all duration-300 text-wrap w-42">
                {content}
              </h2>
            </Link>

            <button
              onClick={() => setMoreModal(!moreModal)}
              className="text-[#686868] dark:text-[#D6D6D6] border-[#3D3D3D] border opacity-80 rounded p-1 transition-all duration-300"
            >
              <IoMdMore />
            </button>
          </div>
          <p className="text-gray-500 dark:text-[#747373] pt-2">{date}</p>
        </div>
      </Draggable>

      {moreModal && (
        <div
          ref={modalRef}
          id="moreModal"
          className="dark:text-white text-text absolute w-[192px] rounded-lg dark:bg-[#282828] bg-gray-200"
        >
          <ul className="flex flex-col gap-3 p-2">
            <li
              onClick={handleEditModal}
              className="flex gap-3 rounded-lg cursor-pointer p-3 hover:bg-gray-300 dark:hover:bg-[#1e1e1e] transition-all duration-30"
            >
              <MdEdit size={20} />
              <p>Rename</p>{" "}
            </li>
            <CopyToClipboard text={urlToCopy}>
              <li
                onClick={handleCopyNote}
                className="flex gap-3 rounded-lg cursor-pointer p-3 hover:bg-gray-300 dark:hover:bg-[#1e1e1e] transition-all duration-30"
              >
                <FaLink size={20} />
                <p>Copy url</p>
              </li>
            </CopyToClipboard>
            <li
              onClick={handleDeleteModal}
              className="flex gap-3 rounded-lg cursor-pointer p-3 hover:bg-gray-300 dark:hover:bg-[#1e1e1e] transition-all duration-30 dark:text-red-400 text-red-600"
            >
              <MdDelete size={20} />
              <p>Delete</p>
            </li>
          </ul>
        </div>
      )}

      <EditModal
        setShow={setShowEditModal}
        show={showEditModal}
        id={id}
        header="Rename note title"
        handleUpdateDoc={handleUpdateDoc}
        content={content}
        buttonContent="Update"
      />
      <DeleteModal
        show={showModal}
        setShow={setShowModal}
        content={content}
        buttonContent="Delete"
        handleDeleteCard={handleDeleteCard}
        id={id}
      />
    </section>
  );
};

export default Card;
