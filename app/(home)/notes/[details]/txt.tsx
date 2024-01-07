"use client";
import ProtectedRoute from "@/app/ProtectedRoute";
import { auth, db } from "@/app/firebase";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { IoArrowBack } from "react-icons/io5";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";

const NoteDetails = ({ params }: { params: any }) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  const [user, loading] = useAuthState(auth);
  const [notes, setNotes] = useState<any[]>([]);
  const [editorContent, setEditorContent] = useState<string>("");

  const Id = params.details;
  const selectedNote = notes.find((note) => note.id === Id);
  console.log(selectedNote);

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

  const getQuillData = (value: any) => {
    setEditorContent(value);
  };

  useEffect(() => {
    if (user && !loading) {
      const userDocRef = doc(db, "user", user?.uid);
      const collectionRef = collection(userDocRef, "note");

      const updateDocsData = setTimeout(() => {
        const document = doc(collectionRef, Id);

        updateDoc(document, {
          editorContent: editorContent,
        })
          .then(() => {
            console.log("Document saved");
          })
          .catch(() => {
            console.error("Cannot Save Document");
          });
      }, 1000);
      return () => clearTimeout(updateDocsData);
    }
  }, [editorContent]);

  useEffect(() => {
    if (user && !loading) {
      const userDocRef = doc(db, "user", user?.uid);
      const collectionRef = collection(userDocRef, "note");

      const getData = async () => {
        const document = doc(collectionRef, Id);
        try {
          const querySnapshot = await getDocs(collectionRef);
          const fetchedNotes = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(fetchedNotes);
          setNotes(fetchedNotes);
        } catch (error) {
          toast.error("Error fetching notes");
        }
      };

      getData();
    }
  }, [editorContent]);

  return (
    <ProtectedRoute>
      <div className="p-5 w-full h-full">
        <div className="h-full text-white">
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
              key={selectedNote?.id}
            >
              {selectedNote?.title}
            </p>

            <ReactQuill
              value={editorContent || ""}
              onChange={getQuillData}
              modules={modules}
              theme="snow"
              style={{ height: "500px" }}
              className="dark:text-white mb-16"
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default NoteDetails;
