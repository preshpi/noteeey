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
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/app/firebase";
import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { CiBoxList } from "react-icons/ci";

const Notes = () => {
  const [user, loading] = useAuthState(auth);
  const [createModal, setCreateModal] = useState(false);
  const [notes, setNotes] = useState<any[]>([]);

  const formatTimestamp = (timestamp: Timestamp): string | null => {
    if (timestamp) {
      const seconds = timestamp.seconds;
      const nanoseconds = timestamp.nanoseconds / 1000000;
      const date = new Date(seconds * 1000 + nanoseconds);
      return moment(date).format("YYYY-MM-DD");
    }
    return "";
  };

  const handleFetchNote = async () => {
    if (user && !loading) {
      const userDocRef = doc(db, "user", user?.uid); // Reference to the user document
      const noteCollectionRef = collection(userDocRef, "note"); // Reference to the "note" subcollection
      const notesQuery = query(noteCollectionRef, orderBy("timestamp", "desc"));
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
      } catch (error) {
        toast.error("Error fetching notes");
      }
    }
  };

  const handleDeleteCard = async (id: string) => {
    if (user) {
      const userDocRef = doc(db, "user", user.uid);
      const cardDocRef = doc(userDocRef, "note", id);

      try {
        await deleteDoc(cardDocRef);
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        toast.success("Card Deleted successfully");
      } catch (error) {
        toast.error("Error deleting the card");
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
        toast.success("Card title updated successfully");
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

  const [color, setColor] = useState("#FFFF");
  const handlerandomColor = () => {
    const randomColors =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    setColor(randomColors);
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col w-full min-h-screen overflow-auto">
        <TopBar />
        <div className="p-5 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between lg:w-[300px] md:w-[500px] dark:bg-[#2C2C2C] bg-[#f2f2f2] dark:border-none border text-black dark:text-[#929292] text-[14px] rounded-lg focus-within:shadow-md">
              <Input
                type="search"
                id="search"
                value=""
                onChange={() => console.log("search")}
                required
                autoComplete="off"
                name="search"
                placeholder="Search notes"
              />
              <span className="px-3 py-3 text-xl">
                <BiSearch />
              </span>
            </div>

            <div className="flex gap-5 text-[#d6d5d5] items-center">
              <button className="px-4 py-3 rounded bg-[#2C2C2C] hover:opacity-90 transition-all duration-300">
                <HiMiniArrowsUpDown />
              </button>
              <button className="px-4 py-3 rounded bg-[#2C2C2C] hover:opacity-90 transition-all duration-300">
                <BsGrid />
              </button>
              <button className="px-4 py-3 rounded bg-[#2C2C2C] hover:opacity-90 transition-all duration-300">
                <CiBoxList />
              </button>
            </div>
          </div>

          <section className="flex flex-col mt-12">
            <div className="flex justify-center items-center">
              {loading && <div className="spinner"></div>}
            </div>
            {loading && notes?.length === 0 ? (
              <h3 className="text-gray-400 font-semibold text-[28px] text-center">
                No Notes
              </h3>
            ) : (
              <div className="flex flex-wrap gap-8 w-full justify-start">
                {notes?.map((data) => (
                  <div key={data.id}>
                    <Card
                      id={data.id}
                      content={data.title}
                      date={data.date}
                      handleDeleteCard={handleDeleteCard}
                      handleUpdateDoc={handleUpdateDoc}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          <div className="fixed bottom-4 z-20 right-4">
            <button
              onClick={handleModal}
              className="text-white bg-[#e85444] hover:bg-[#f6695a] transition-colors duration-300 rounded-full m-3 w-16 h-16 flex items-center justify-center"
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
