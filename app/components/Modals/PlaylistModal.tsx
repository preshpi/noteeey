import React, { useRef, useState } from "react";
import Overlay from "../Overlay";
import { NextPage } from "next";
import { PlaylistModalProps } from "@/app/types/components/Modals/PlaylistModalProps";
import useModalAnimation from "./useModalAnimation";
import { useAppContext } from "@/app/context/AppContext";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handlePlaylistSubmit(embedCode);
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
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center gap-5"
          >
            <label className="text-[14px] lg:text-[22px] font-semibold">
              Paste your playlist embed code
            </label>
            <textarea
              value={embedCode}
              cols={10}
              rows={5}
              placeholder="e.g spotify, apple music or youtube music"
              className="outline-none focus:none border border-gray-200 rounded-lg w-full p-2 text-[14px]"
              onChange={(e) => setEmbedCode(e.target.value)}
            />
            <button
              style={backgroundStyle}
              type="submit"
              className="py-2 px-6 rounded-lg dark:text-white text-[#131313] hover:opacity-75 transistion-all duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </Overlay>
  );
};

export default PlaylistModal;
