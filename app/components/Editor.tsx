"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  doc,
  onSnapshot,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import Quill from "quill";
import ImageResize from "quill-image-resize-module";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "sonner";
import ProtectedRoute from "@/app/ProtectedRoute";
import { auth, db } from "@/app/firebase";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const NoteDetails = ({ params }: { params: any }) => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [editorContent, setEditorContent] = useState<string>("");
  const [documentRef, setDocumentRef] = useState<any | null>(null);
  const [notes, setNotes] = useState<any[]>([]);
  const isMounted = useIsMounted();
  const Id = params.details;
  const selectedNote = notes.find((note) => note.id === Id);

  const goBack = () => {
    router.back();
  };

  const subscribeToUpdates = (docRef: any) => {
    return onSnapshot(docRef, (doc: any) => {
      if (doc.exists()) {
        setEditorContent(doc.data()?.editorContent || "");
      }
    });
  };

  useEffect(() => {
    const registerImageResizeModule = async () => {
      if (typeof Quill !== "undefined") {
        const { default: ImageResize } = await import(
          "quill-image-resize-module"
        );
        Quill.register("modules/imageResize", ImageResize);
      }
    };

    registerImageResizeModule();
  }, []);

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

  function useIsMounted() {
    const isMounted = React.useRef(false);
    useEffect(() => {
      isMounted.current = true;
      return () => {
        isMounted.current = false;
      };
    }, []);

    return React.useCallback(() => isMounted.current, []);
  }

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "code-block",
    "align",
    "formula",
  ];
  const modules = [
    {
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
      imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize"],
      },
    },
  ];
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

            {isMounted() || document ? (
              <ReactQuill
                value={editorContent || ""}
                onChange={getQuillData}
                modules={modules}
                formats={formats}
                theme="snow"
                style={{ height: "500px" }}
                className="dark:text-white mb-16"
              />
            ) : (
              <textarea
                value={editorContent || ""}
                onChange={(e) => getQuillData(e.target.value)}
                className="dark:text-white mb-16"
                style={{ height: "500px", width: "100%" }}
              />
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default NoteDetails;
