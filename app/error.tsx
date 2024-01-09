"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { toast } from "sonner";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    toast.error("An error occured");
  }, [error]);

  return (
    <div className="items-center flex justify-center flex-col h-screen gap-5">
      <h2 className="dark:text-white text-black font-semibold text-3xl">
        Something went wrong!
      </h2>
      <button
        className="dark:text-white dark:hover:text-slate-300 underline transition-colors duration-300"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
