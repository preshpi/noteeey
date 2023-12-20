"use client";
import ProtectedRoute from "@/app/ProtectedRoute";
import { auth, db } from "@/app/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "sonner";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const NoteDetails = ({ params }: { params: any }) => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  const [user, loading] = useAuthState(auth);
  const [notes, setNotes] = useState<any[]>([]);

  const Id = params.details;
  const selectedNote = notes.find((note) => note.id === Id);

  const initialValue = selectedNote ? selectedNote.content || "" : "";
  const [value, setValue] = useState(initialValue);

  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  if (user && !loading) {
    const userDocRef = doc(db, "user", user?.uid);
    const noteCollectionRef = collection(userDocRef, "note"); // Reference to the "note" subcollection
  }

  // try {
  //   const querySnapshot = await getDocs(noteCollectionRef);
  //   const notesData: React.SetStateAction<any[]> = [];
  //   querySnapshot.forEach((doc) => {
  //     notesData.push({ id: doc.id, ...doc.data() });
  //   });
  //   //apply the formate function to the timestamp inside the data directly
  //   const formattedNotes = notesData.map((data) => ({
  //     ...data,
  //   }));
  //   setNotes(formattedNotes);
  // } catch (error) {
  //   toast.error("Error fetching notes");
  // }

  return (
    <ProtectedRoute>
      <div className="p-5 w-full h-full">
        <div className="h-full">
          {selectedNote && (
            <div className="flex items-center justify-center flex-col">
              <div className="flex items-center justify-start w-full dark:text-white text-text">
                <button
                  onClick={goBack}
                  className="cursor-pointer text-3xl hover:animate-pulse"
                >
                  <IoArrowBack />
                </button>
              </div>
              <p
                className="text-center p-2 dark:text-white text-2xl font-semibold"
                key={selectedNote.id}
              >
                {selectedNote.title}
              </p>

              <ReactQuill
                modules={modules}
                theme="snow"
                value={value}
                className="dark:text-white mb-16"
                onChange={setValue}
              />
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default NoteDetails;
