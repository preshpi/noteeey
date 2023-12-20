"use client";
import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { Cardsprops } from "../types/components";
import DeleteModal from "./Modals/DeleteModal";
import EditModal from "./Modals/EditModal";
import { IoIosMore, IoMdMore } from "react-icons/io";
import Link from "next/link";
import { FaLink } from "react-icons/fa6";
const Card: NextPage<Cardsprops> = ({
  content,
  date,
  handleDeleteCard,
  handleUpdateDoc,
  id,
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
  return (
    <>
      <div className="dark:bg-gray-100 bg-gray-200 p-4 mb-4 rounded-md border-l-4 border-red-500 w-[288px]">
        <div className="flex justify-between gap-2 items-center text-xl mb-2">
          <Link href={`/notes/${id}`}>
            <h2 className="font-semibold cursor-pointer hover:opacity-80 transition-all duration-300 text-wrap w-42">
              {content}
            </h2>
          </Link>
          <button
            onClick={() => setMoreModal(!moreModal)}
            className="text-black hover:bg-gray-100 opacity-80 rounded-lg p-2 transition-all duration-300"
          >
            <IoMdMore />
          </button>
        </div>
        <p className="text-gray-500">{date}</p>
      </div>
      {moreModal && (
        <div
          ref={modalRef}
          className="dark:text-white text-text w-[192px] rounded-lg dark:bg-[#282828] bg-gray-200"
        >
          <ul className="flex flex-col gap-3 p-2">
            <li
              onClick={handleEditModal}
              className="flex gap-3 rounded-lg cursor-pointer p-3 hover:bg-gray-300 dark:hover:bg-[#1e1e1e] transition-all duration-30"
            >
              <MdEdit size={20} />
              <p>Rename</p>{" "}
            </li>
            <li className="flex gap-3 rounded-lg cursor-pointer p-3 hover:bg-gray-300 dark:hover:bg-[#1e1e1e] transition-all duration-30">
              <FaLink size={20} />
              <p>Copy url</p>
            </li>
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
        header="Edit your note title"
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
    </>
  );
};

export default Card;
