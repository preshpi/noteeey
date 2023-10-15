"use client";
import { useState } from "react";
import Button from "./components/Button";
import Card from "./components/Card";
import Input from "./components/Input";
import Modal from "./components/Modal";
import Loader from "./components/Loader";

export default function Home() {
  const handleChange = () => {
    console.log("input");
  };

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true)
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <main>
      <h2 className="text-accent">yayy!</h2>
      <Button additionalClasses="w-full" onClick={openModal}>open modal</Button>
      <Card content="I'm a card" />
      <Input
        name="precious"
        id="precious"
        type="text"
        placeholder="enter your name"
        required
        onChange={handleChange}
        autoComplete="off"
      />
      <Modal
        show={showModal}
        content="I'm a modal"
        setShow={setShowModal}
        buttonContent="submit"
        buttonAction={closeModal}
      />
      <Loader/>
    </main>
  );
}
