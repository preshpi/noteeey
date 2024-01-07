"use client";
import ProtectedRoute from "@/app/ProtectedRoute";
import Card from "@/app/components/Card";
import Input from "@/app/components/Input";
import { useAppContext } from "@/app/context/AppContext";
import { auth, db } from "@/app/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiSearch } from "react-icons/bi";
import { BsGrid } from "react-icons/bs";
import { CiBoxList } from "react-icons/ci";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { IoArrowBack } from "react-icons/io5";
import { Toaster, toast } from "sonner";
import { GoMultiSelect } from "react-icons/go";
import { FiMenu } from "react-icons/fi";

const DeletedNotes = () => {
  const [user, loading] = useAuthState(auth);
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const [deletedNote, setDeletedNotes] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const { isSideBarOpen, setIsSideBarOpen } = useAppContext();

  const FetchDeletedNotes = async () => {
    if (user && !loading) {
      const userDocRef = doc(db, "user", user?.uid);
      const deletednoteCollectionRef = collection(userDocRef, "deletedNotes");
      const notesQuery = query(
        deletednoteCollectionRef,
        orderBy("timestamp", ascendingOrder ? "desc" : "asc")
      );
      try {
        const querySnapshot = await getDocs(notesQuery);
        const deletedNotesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDeletedNotes(deletedNotesData);
        setFetching(false);
      } catch (error) {
        toast.error("Error fetching notes");
      }
    }
  };

  useEffect(() => {
    if (!loading) {
      FetchDeletedNotes();
    }
  }, [user, loading]);

  const handleToggleOrder = () => {
    setAscendingOrder((prevOrder) => {
      return !prevOrder;
    });
    FetchDeletedNotes();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "grid" ? "list" : "grid"));
  };

  const { color } = useAppContext();
  const textStyle = color ? { color: color } : {};

  const goBack = () => {
    router.back();
  };

  const handleSelect = () => {
    console.log("coming soon");
  };
  const handleDeleteCard = async (id: string) => {
    if (user) {
      const userDocRef = doc(db, "user", user.uid);
      const cardDocRef = doc(userDocRef, "deletedNotes", id);
      const deletedNotesCollectionRef = collection(userDocRef, "deletedNotes");

      try {
        await deleteDoc(cardDocRef);
        setDeletedNotes((prevNotes) =>
          prevNotes.filter((note) => note.id !== id)
        );
        toast.success("Note Deleted permanently");
      } catch (error) {
        toast.error("Error deleting the card");
      }
    }
  };

  const handleUpdateDoc = async (id: string, newTitle: string) => {
    if (user) {
      const userDocRef = doc(db, "user", user.uid);
      const cardDocRef = doc(userDocRef, "deletedNotes", id);

      try {
        await updateDoc(cardDocRef, {
          title: newTitle,
        });

        setDeletedNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === id ? { ...note, title: newTitle } : note
          )
        );
        toast.success("Note title updated successfully");
      } catch (error) {
        toast.error("Error updating the card title");
      }
    }
  };

  return (
    <ProtectedRoute>
      <section className="w-full p-5">
        <div className="flex items-center w-full lg:justify-start gap-5 dark:text-white text-text">
          {!isSideBarOpen && (
            <div className="w-8 h-8 flex items-center justify-center">
              <button
                onClick={() => setIsSideBarOpen(true)}
                className="flex items-center justify-center hover:bg-opacity-50 bg-[#131313] text-white rounded-md w-full h-full"
              >
                <FiMenu />
              </button>
            </div>
          )}
          <div
            onClick={goBack}
            className="cursor-pointer text-3xl hover:animate-pulse"
          >
            <IoArrowBack />
          </div>
          <h3 className="text-[30px] font-semibold">Trash</h3>
        </div>
        <div className="flex gap-y-5 justify-between flex-col lg:flex-row pt-5">
          <div className="flex items-center justify-between w-[300px] dark:bg-[#2C2C2C] bg-[#f2f2f2] border-none text-black dark:text-[#929292] text-[14px] rounded-lg focus-within:shadow-md">
            <Input
              type="search"
              id="search"
              value={searchInput}
              onChange={handleInputChange}
              required
              autoComplete="off"
              additionalClasses="h-10 w-full rounded-md w-full dark:text-[#eee] text-text bg-transparent px-4 py-3 text-[15px] font-light outline-none md:placeholder-text"
              name="search"
              placeholder="Search notes"
            />
            <span
              style={textStyle}
              className="px-3 py-3 text-xl cursor-pointer"
            >
              <BiSearch />
            </span>
          </div>

          <div className="flex gap-5 text-[#d6d5d5] items-center">
            <button
              onClick={handleSelect}
              style={textStyle}
              className="px-4 py-3 rounded hover:opacity-75 bg-[#2C2C2C] transition-all duration-300"
            >
              <GoMultiSelect />
            </button>
            <button
              onClick={handleToggleOrder}
              style={textStyle}
              className="px-4 py-3 rounded hover:opacity-75 bg-[#2C2C2C] transition-all duration-300"
            >
              <HiMiniArrowsUpDown />
            </button>
            <button
              onClick={handleViewMode}
              style={textStyle}
              className="px-4 py-3 rounded hover:opacity-75 bg-[#2C2C2C] transition-all duration-300"
            >
              {viewMode === "grid" ? <BsGrid /> : <CiBoxList />}
            </button>
          </div>
        </div>
        <section className="flex flex-col mt-12">
          <div className="flex justify-center items-center">
            {loading && <div className="spinner"></div>}
          </div>
          {!fetching && deletedNote?.length === 0 ? (
            <div className="flex flex-col gap-2 text-gray-400 font-semibold w-full justify-center items-center">
              <h3 className="text-[28px]">No Notes</h3>
              <p className="text-[16px]">Deleted notes will be located here</p>
            </div>
          ) : (
            <div
              className={`gap-5 w-full ${
                viewMode === "grid" ? "flex flex-wrap justify-start" : "grid"
              }`}
            >
              {deletedNote
                .filter(
                  (data) =>
                    !searchInput ||
                    data.title
                      .toLowerCase()
                      .includes(searchInput.toLocaleLowerCase())
                )
                .map((data: any) => (
                  <div key={data.id}>
                    <Card
                      id={data.id}
                      content={data.title}
                      date={data.date}
                      handleDeleteCard={handleDeleteCard}
                      handleUpdateDoc={handleUpdateDoc}
                      viewMode={viewMode}
                    />
                  </div>
                ))}
            </div>
          )}
        </section>
      </section>
      <Toaster richColors />
    </ProtectedRoute>
  );
};

export default DeletedNotes;
