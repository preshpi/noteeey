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
import { toast } from "sonner";
import useModalAnimation from "@/app/components/Modals/useModalAnimation";
import { useAppContext } from "@/app/context/AppContext";
import MDEditor from "@uiw/react-md-editor";
import { MdClose } from "react-icons/md";

const NoteDetails = ({ params }: { params: any }) => {
  const router = useRouter();
  const { color, submittedEmbedCode, setSubmittedEmbedCode } = useAppContext();
  const background = color || "#e85444";
  const backgroundStyle = { backgroundColor: background };
  const [user, loading] = useAuthState(auth);
  const [editorContent, setEditorContent] = useState("");
  const [documentRef, setDocumentRef] = useState<DocumentReference | null>(
    null
  );
  const [contentModified, setContentModified] = useState<boolean>(false);
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
    setContentModified(true);
  };
  const sectionRef = useRef<HTMLDivElement>(null);
  useModalAnimation(sectionRef);

  const handleSave = () => {
    if (documentRef && contentModified) {
      // Only save if content is modified
      updateDoc(documentRef, {
        editorContent: editorContent,
      })
        .then(() => {
          toast.success("Document saved");
          setContentModified(false); // Reset content modification status
        })
        .catch(() => {
          toast.error("Cannot Save Document");
        });
    }
  };
  const handleRemovePlaylist = () => {
    localStorage.removeItem("submittedEmbedCode");
    setSubmittedEmbedCode(null);
    toast.success("Playlist removed successfully!")
  };

  return (
    <ProtectedRoute>
      <div className="p-5 w-full h-full">
        <div className="flex h-full flex-col overflow-auto">
          <div className="flex items-center justify-between w-full dark:text-white text-text">
            <button
              onClick={goBack}
              className="cursor-pointer text-3xl hover:animate-pulse"
            >
              <IoArrowBack />
            </button>
            <button
              style={backgroundStyle}
              onClick={handleSave}
              className="py-2 px-6 rounded-lg dark:text-white text-[#131313] hover:opacity-75 transistion-all duration-300"
            >
              Save
            </button>
          </div>
          <p
            className="text-center p-2 dark:text-white text-[#131313] text-2xl font-semibold"
            key={selectedNote?.id}
          >
            {selectedNote?.title}
          </p>

          <MDEditor
            value={editorContent}
            onChange={(newValue: string | undefined) => {
              if (newValue) {
                getQuillData(newValue);
              }
            }}
          />
          {submittedEmbedCode && (
            <div className="flex gap-x-5 items-end w-full mt-24 bottom-0 ">
              <div
                dangerouslySetInnerHTML={{ __html: submittedEmbedCode || "" }}
              />

              <button
                style={backgroundStyle}
                onClick={handleRemovePlaylist}
                className="px-1 py-1 text-[0.8rem] dark:text-white text-text hover:opacity-75 transistion-all duration-300  rounded-lg"
              >
                remove playlist
              </button>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default NoteDetails;
