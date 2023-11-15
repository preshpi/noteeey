"use client";
import { NextPage } from "next";
import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { Cardsprops } from "../types/components";
import DeleteModal from "./Modals/DeleteModal";
import EditModal from "./Modals/EditModal";
import SkeletonLoader from "./SkeletonLoader";

const Card: NextPage<Cardsprops> = ({
  content,
  date,
  handleDeleteCard,
  handleUpdateDoc,
  loading,
  id,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const handleCreateModal = () => {
    setShowModal(true);
  };

  const handleEditModal = () => {
    setShowEditModal(true);
  };
  if (loading) {
    return <SkeletonLoader />;
  }
  return (
    <>
      <div className="group lg:w-[400px] md:w-[300px] w-[250px] h-[250px] mx-auto rounded-[30px] cursor-pointer bg-blue-600 transition-all durtaion-300 shadow-lg  items-center justify-center">
        <div className="hidden group-hover:block">
          <div className="flex items-center justify-between p-5 w-full">
            <div className="flex items-center justify-center gap-5">
              <span
                onClick={handleEditModal}
                className="hover:bg-slate-200 hover:text-green-600 w-8 h-8 transition-all durtaion-75 rounded-full flex items-center justify-center"
              >
                <MdEdit size={20} />
              </span>
              <span
                onClick={handleCreateModal}
                className="hover:bg-slate-200 hover:text-red-600 w-8 h-8 transition-all durtaion-75 rounded-full flex items-center justify-center"
              >
                <MdDelete size={20} />
              </span>
            </div>

            {date && <div className="text-base italic">{date}</div>}
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center justify-center h-full group-hover:h-[0px] group-hover:pt-[52px]">
          <p className="text-center lg:text-xl text-base uppercase">
            {content}
          </p>
        </div>
      </div>
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
