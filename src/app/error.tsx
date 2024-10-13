
"use client";
import { useEffect } from "react";
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2 className="text-center text-6xl text-red-500">Something went wrong!</h2>
      <button
      className="bg-red-500 py-3 px-5 text-white"
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
