"use client";
import React, { useState } from "react";
import ProtectedRoute from "../../ProtectedRoute";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

import DarkModeTheme from "../../components/DarkModeTheme";
import ColorPicker from "@/app/components/ColorPicker";
import { useAppContext } from "@/app/context/AppContext";
import { FiMenu } from "react-icons/fi";
import DeleteAccountModal from "@/app/components/Modals/DeleteAccountModal";
import DisableAccountModal from "@/app/components/Modals/DisableAccountModal";
import { toast } from "sonner";

const Settings = () => {
  const [user, loading] = useAuthState(auth);
  const { isSideBarOpen, setIsSideBarOpen } = useAppContext();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showDisableModal, setShowDisableModal] = useState<boolean>(false);

  const handleDeleteAccount = async () => {
    if (user && !loading) {
      try {
        setShowDeleteModal(true);
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };
  const handleDisableAccount = async () => {
    if (user && !loading) {
      try {
        setShowDisableModal(true);
      } catch (error: any) {
        toast.error("Error deleting account:", error);
      }
    }
  };

  return (
    <ProtectedRoute>
      <section className="w-full">
        <div className="flex items-center justify-start px-5 gap-5 dark:text-white text-text mt-3">
          {!isSideBarOpen && (
            <div className="w-8 h-8 flex items-center justify-center">
              <button
                onClick={() => setIsSideBarOpen(true)}
                className="flex items-center justify-center hover:bg-opacity-50 bg-[#131313] text-white rounded-md w-full h-full"
              >
                <FiMenu />
              </button>
            </div>
          )}

          <div className="flex flex-col gap-1 text-[#131313] dark:text-[#FFFFFF]">
            <h3 className="text-[20px] ">Settings</h3>
            <p className="text-[14px]">Manage account settings.</p>
          </div>
        </div>

        <div className="mt-8 p-5">
          <section className="flex flex-col gap-8">
            <div className="space-y-3">
              <p className="font-semibold dark:text-[#fff] text-text text-[16px]">
                General
              </p>
              <div className="flex justify-between">
                <p className="text-[14px] dark:text-[#fff] text-[#131313]">
                  Theme Preferences
                </p>
                <DarkModeTheme />
              </div>
            </div>

            <div className="flex justify-between">
              <p className="text-[14px] dark:text-[#fff] text-text">
                Note Display Preferences
              </p>

              <ColorPicker />
            </div>

            <div className="flex gap-3 flex-col w-[383px]">
              <p className="text-[16px] dark:text-[#fff] text-text">
                Confirm Account Action
              </p>
              <p className="text-[#131313] dark:text-[#ccc] text-[14px]">
                Note: Deleting your account permanently removes all your notes
                and data. Disabling it suspends access temporarily. Choose
                carefully.
              </p>
              <div className="flex items-center gap-5">
                <button
                  onClick={handleDeleteAccount}
                  className="w-full py-3 bg-red-600 hover:opacity-75 duration-300 transition-all dark:text-white rounded-[6px] max-w-[171px]"
                >
                  Delete my account
                </button>
                <button
                  onClick={handleDisableAccount}
                  disabled
                  className="w-full cursor-not-allowed py-3 bg-[#CD4628] hover:opacity-75 duration-300 transition-all dark:text-white rounded-[6px] max-w-[171px]"
                >
                  Disable my account
                </button>{" "}
              </div>
            </div>
          </section>
        </div>
      </section>

      {showDeleteModal && (
        <DeleteAccountModal
          show={showDeleteModal}
          setShow={setShowDeleteModal}
          buttonContent="Yes"
        />
      )}
      {showDisableModal && (
        <DisableAccountModal
          show={showDisableModal}
          setShow={setShowDisableModal}
          buttonContent="Yes"
        />
      )}
    </ProtectedRoute>
  );
};

export default Settings;
