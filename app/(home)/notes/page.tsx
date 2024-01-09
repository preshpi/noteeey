"use client";
import ProtectedRoute from "@/app/ProtectedRoute";
import Card from "@/app/components/Card";
import Input from "@/app/components/Input";
import TopBar from "@/app/components/TopBar";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Toaster, toast } from "sonner";
import { BiPlus } from "react-icons/bi";
import { BsGrid } from "react-icons/bs";
import CreateNoteModal from "@/app/components/Modals/CreateNoteModal";

import {
  Timestamp,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/app/firebase";
import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { CiBoxList } from "react-icons/ci";
import { useAppContext } from "@/app/context/AppContext";

const Notes = () => {
  const [user, loading] = useAuthState(auth);
  const [createModal, setCreateModal] = useState(false);
  const [notes, setNotes] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [searchInput, setSearchInput] = useState("");

  const { color } = useAppContext();
  const backgroundStyle = color ? { backgroundColor: color } : {};
  const textStyle = color ? { color: color } : {};

  const formatTimestamp = (timestamp: Timestamp): string | null => {
    if (timestamp) {
      const seconds = timestamp.seconds;
      const nanoseconds = timestamp.nanoseconds / 1000000;
      const date = new Date(seconds * 1000 + nanoseconds);
      return moment(date).format("MM/DD/YYYY - h:mm A");
    }
    return "";
  };

  const handleFetchNote = async () => {
    if (user && !loading) {
      const userDocRef = doc(db, "user", user?.uid); // Reference to the user document
      const noteCollectionRef = collection(userDocRef, "note"); // Reference to the "note" subcollection
      const notesQuery = query(
        noteCollectionRef,
        orderBy("timestamp", ascendingOrder ? "desc" : "asc")
      );
      try {
        const querySnapshot = await getDocs(notesQuery);
        const notesData: React.SetStateAction<any[]> = [];
        querySnapshot.forEach((doc) => {
          notesData.push({ id: doc.id, ...doc.data() });
        });
        //apply the formate function to the timestamp inside the data directly
        const formattedNotes = notesData.map((data) => ({
          ...data,
          date: formatTimestamp(data.timestamp),
        }));

        setNotes(formattedNotes);
        setFetching(false);
      } catch (error) {
        toast.error("Error fetching notes");
      }
    }
  };

  const handleToggleOrder = () => {
    setAscendingOrder((prevOrder) => {
      return !prevOrder;
    });
    handleFetchNote();
  };

  const handleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "grid" ? "list" : "grid"));
  };

  const handleDeleteCard = async (id: string) => {
    if (user) {
      const userDocRef = doc(db, "user", user.uid);
      const cardDocRef = doc(userDocRef, "note", id);
      const deletedNotesCollectionRef = collection(userDocRef, "deletedNotes");

      try {
        await runTransaction(db, async (transaction) => {
          // Get the note to be deleted
          const noteSnapshot = await transaction.get(cardDocRef);
          const noteData = noteSnapshot.data();

          // Move the note to the "deletedNotes" collection
          await transaction.set(doc(deletedNotesCollectionRef, id), noteData);

          // Delete the note from the "note" collection
          await transaction.delete(cardDocRef);
        });

        // Remove the note from the current notes list
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));

        toast.success("Note moved to Trash");
      } catch (error) {
        toast.error("Error moving the note");
      }
    }
  };

  const handleUpdateDoc = async (id: string, newTitle: string) => {
    if (user) {
      const userDocRef = doc(db, "user", user.uid);
      const cardDocRef = doc(userDocRef, "note", id);

      try {
        await updateDoc(cardDocRef, {
          title: newTitle,
        });

        setNotes((prevNotes) =>
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

  const addNewNote = (newNote: any) => {
    const timestamp = Timestamp.fromDate(new Date()); // Use the current date as an example
    const formattedNote = {
      ...newNote,
      timestamp: timestamp,
      date: formatTimestamp(timestamp),
    };

    setNotes((prevNotes) => [formattedNote, ...prevNotes]);
  };

  const handleModal = () => {
    setCreateModal(true);
  };

  useEffect(() => {
    if (!loading) {
      handleFetchNote();
    }
  }, [user, loading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col w-full min-h-screen overflow-auto">
        <TopBar />
        <div className="p-5 flex flex-col gap-5">
          <div className="flex gap-y-5 lg:justify-between flex-col lg:flex-row">
            <div className="flex items-center justify-between w-[300px] dark:bg-[#2C2C2C] bg-[#F7F7F7] border-none text-[14px] rounded-lg focus-within:shadow-md">
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
                onClick={handleToggleOrder}
                style={textStyle}
                className="px-4 py-3 rounded hover:opacity-90 dark:bg-[#2C2C2C] bg-[#EAEAEA] transition-all duration-300"
              >
                <HiMiniArrowsUpDown />
              </button>

              <button
                onClick={handleViewMode}
                style={textStyle}
                className="px-4 py-3 rounded hover:opacity-90 dark:bg-[#2C2C2C] bg-[#EAEAEA] transition-all duration-300"
              >
                {viewMode === "grid" ? <BsGrid /> : <CiBoxList />}
              </button>
            </div>
          </div>

          <section className="flex flex-col mt-12">
            <div className="flex justify-center items-center">
              {loading && <div className="spinner"></div>}
            </div>
            {!fetching && notes?.length === 0 ? (
              <h3 className="text-gray-400 font-semibold text-[28px] text-center">
                No Notes
              </h3>
            ) : (
              <div
                className={`gap-5 w-full ${
                  viewMode === "grid" ? "flex flex-wrap justify-start" : "grid"
                }`}
              >
                {notes
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

          <div className="fixed bottom-4 z-20 right-4">
            <button
              onClick={handleModal}
              style={backgroundStyle}
              className="text-white transition-colors duration-300 rounded-full m-3 w-16 h-16 flex items-center justify-center"
            >
              <BiPlus className="text-[45px]" />
            </button>
          </div>
          {createModal && (
            <CreateNoteModal
              show={createModal}
              content="Create a note"
              setShow={setCreateModal}
              buttonContent="Submit"
              addNewNote={addNewNote}
            />
          )}
          <Toaster position="bottom-right" richColors />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Notes;
