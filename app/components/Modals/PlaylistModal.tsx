import React, { useRef, useState, useEffect } from "react";
import Overlay from "../Overlay";
import { NextPage } from "next";
import { PlaylistModalProps } from "@/app/types/components/Modals/PlaylistModalProps";
import useModalAnimation from "./useModalAnimation";
import { useAppContext } from "@/app/context/AppContext";
import { toast } from "sonner";

const PlaylistModal: NextPage<PlaylistModalProps> = ({
  show,
  setShow,
  handlePlaylistSubmit,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useModalAnimation(modalRef);
  const { color } = useAppContext();
  const background = color || "#e85444";
  const backgroundStyle = { backgroundColor: background };

  const [embedCode, setEmbedCode] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (embedCode.trim() === "") {
      setErrorMessage("Textarea is empty");
      setIsFormValid(false);
    } else {
      const iframeRegex = /^<iframe[^>]*><\/iframe>$/i;
      if (!iframeRegex.test(embedCode.trim())) {
        setErrorMessage("Please enter a valid iframe HTML tag.");
        setIsFormValid(false);
      } else {
        setErrorMessage("");
        setIsFormValid(true);
      }
    }
  }, [embedCode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error(errorMessage);
      return;
    }
    handlePlaylistSubmit(embedCode);
    setShow(false);
    toast.success("Playlist added successfully! 🎉");
  };

  const handleCancel = () => {
    setShow(false);
  };

  return (
    <Overlay show={show} setShow={setShow} modalRef={modalRef}>
      {show && (
        <div
          ref={modalRef}
          id="playlistModal"
          className="m-10 max-w-[405px] p-6 flex h-fit w-full flex-col items-center rounded-[10px] bg-white dark:bg-[#232323] gap-3"
        >
          <form className="flex flex-col items-center justify-center gap-5 dark:text-[#eee] text-[#131313]">
            <label className="text-[14px] lg:text-[22px] font-semibold">
              Paste your playlist embed code
            </label>
            <textarea
              value={embedCode}
              cols={10}
              rows={5}
              placeholder="e.g spotify, apple music or youtube music"
              className="focus:outline-none border-[#C2C2C2] border bg-transparent dark:text-[#eee] text-text rounded-lg w-full p-4 text-sm"
              onChange={(e) => setEmbedCode(e.target.value)}
            />

            <div className="flex w-full justify-end gap-5">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#eee] dark:hover:bg-[#1d1d1d] border border-[#3D3D3D] dark:border-[#C2C2C2]"
              >
                Cancel
              </button>
              <button
                style={backgroundStyle}
                type="submit"
                onClick={handleSubmit}
                className="py-2 px-6 rounded-lg dark:text-white text-[#131313] hover:opacity-75 transistion-all duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </Overlay>
  );
};

export default PlaylistModal;
