"use client";
import ProtectedRoute from "@/app/ProtectedRoute";
import Card from "@/app/components/Card";
import Input from "@/app/components/Input";
import TopBar from "@/app/components/TopBar";
import { RootState } from "@/app/store/store";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import { BiPlus } from "react-icons/bi";
import CreateNoteModal from "@/app/components/Modals/CreateNoteModal";
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/app/firebase";
import moment from "moment";
const Notes = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [createModal, setCreateModal] = useState(false);
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const formatTimestamp = (timestamp: Timestamp): string | null => {
    if (timestamp) {
      const seconds = timestamp.seconds;
      const nanoseconds = timestamp.nanoseconds / 1000000; // Convert nanoseconds to milliseconds
      const date = new Date(seconds * 1000 + nanoseconds);
      return moment(date).format("YYYY-MM-DD");
    }
    return "";
  };

  const handleFetchNote = async () => {
    if (user) {
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
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching notes");
      }
    }
  };

  const handleDeleteCard = async (id: string) => {
    if (user) {
      const userDocRef = doc(db, "user", user.uid); // Reference to the user document

      // Construct a reference to the specific card document using its ID
      const cardDocRef = doc(userDocRef, "note", id);

      try {
        await deleteDoc(cardDocRef);
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      } catch (error) {
        toast.error("Error deleting the card");
      }
    }
  };

  const addNewNote = (newNote: any) => {
    // Ensure that newNote.timestamp is a valid Timestamp object
    const timestamp = Timestamp.fromDate(new Date()); // Use the current date as an example

    // Create a formatted note with the timestamp
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
    handleFetchNote();
  }, []);

  const [color, setColor] = useState("#FFFF");
  const handlerandomColor = () => {
    const randomColors =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    setColor(randomColors);
  };

  return (
    <ProtectedRoute>
      <TopBar />

      <>
        <div className="max-w-[800px] mx-auto">
          <section className="flex flex-col gap-6 items-center justify-center mt-8 px-2 w-full">
            <h2 className="lg:text-5xl text-3xl text-center font-bold text-[#e6e4e4]">
              <span className="text-[blue]">Create</span> Quick Access{" "}
              <span className="text-[green] italic">Sticky</span> Notes{" "}
            </h2>
          </section>
          <section className="flex items-center justify-center mt-8">
            <div className="flex items-center justify-center lg:w-[500px] md:w-[500px] border border-gray-300 text-[#e6e4e4] rounded-lg focus-within:shadow-md">
              <span className="px-3 py-3 text-xl">
                <BiSearch />
              </span>
              <Input
                type="search"
                id="search"
                value=""
                onChange={() => console.log("search")}
                required
                autoComplete="off"
                name="search"
                placeholder="Search here..."
              />
            </div>
          </section>
        </div>{" "}
        <section className="flex flex-wrap max-w-[1000px] mx-auto gap-5 items-center justify-center pt-24 py-8">
          {loading && <div className="text-white">loading notes....</div>}
          {notes?.map((data) => (
            <Card
              key={data.id}
              id={data.id}
              content={data.title}
              date={data.date}
              handleDeleteCard={handleDeleteCard}
            />
          ))}
        </section>
        <div className="fixed bottom-4 right-4">
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
      </>
    </ProtectedRoute>
  );
};

export default Notes;
