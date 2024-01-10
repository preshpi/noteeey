"use client";
import ProtectedRoute from "@/app/ProtectedRoute";
import { auth, db } from "@/app/firebase";
import {
  DocumentReference,
  collection,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { IoArrowBack } from "react-icons/io5";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";
import useModalAnimation from "@/app/components/Modals/useModalAnimation";

const NoteDetails = ({ params }: { params: any }) => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [editorContent, setEditorContent] = useState<string>("");
  const [documentRef, setDocumentRef] = useState<DocumentReference | null>(
    null
  );
  const [notes, setNotes] = useState<any[]>([]);

  const Id = params.details;
  const selectedNote = notes.find((note) => note.id === Id);

  const goBack = () => {
    router.back();
  };

  const subscribeToUpdates = (docRef: DocumentReference) => {
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setEditorContent(doc.data()?.editorContent || "");
      }
    });
  };

  useEffect(() => {
    if (user && !loading) {
      const userDocRef = doc(db, "user", user?.uid);
      const collectionRef = collection(userDocRef, "note");
      const docRef = doc(collectionRef, Id);
      setDocumentRef(docRef);

      const unsubscribe = subscribeToUpdates(docRef);
      const getData = async () => {
        try {
          const querySnapshot = await getDocs(collectionRef);
          const fetchedNotes = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setNotes(fetchedNotes);
        } catch (error) {
          toast.error("Error fetching notes");
        }
      };

      getData();
      return () => unsubscribe();
    }
  }, [user, loading, Id]);

  const getQuillData = (value: any) => {
    setEditorContent(value);

    // Update document in response to user's actions
    if (documentRef) {
      updateDoc(documentRef, {
        editorContent: value,
      })
        .then(() => {
          toast.success("Document saved");
        })
        .catch(() => {
          toast.error("Cannot Save Document");
        });
    }
  };
  // const sectionRef = useRef<HTMLDivElement>(null);
  // useModalAnimation(sectionRef);

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];
  return (
    <ProtectedRoute>
      <div className="p-5 w-full h-full">
        <div className="h-full">
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
              className="text-center p-2 dark:text-white text-[#131313] text-2xl font-semibold"
              key={selectedNote?.id}
            >
              {selectedNote?.title}
            </p>

            <ReactQuill
              value={editorContent || ""}
              onChange={getQuillData}
              modules={{
                toolbar: [
                  ["bold", "italic", "underline", "strike"],
                  ["blockquote", "code-block"],
                  ["link", "image", "video"],
                  [{ header: 1 }, { header: 2 }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  [{ script: "sub" }, { script: "super" }],
                  [{ indent: "-1" }, { indent: "+1" }],
                  [{ direction: "rtl" }],
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  [{ color: [] }, { background: [] }],
                  [{ font: [] }],
                  [{ align: [] }],
                  ["clean"],
                ],
              }}
              formats={formats}
              theme="snow"
              style={{ height: "500px" }}
              className="dark:text-white text-[#131313] mb-16"
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default NoteDetails;
