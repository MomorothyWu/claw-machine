"use client"
import { useEffect, useRef } from "react";
import cross from "@/../public/cross.svg"
import Image from "next/image";

export default function WinPopup({ isWin, onClose }) {
  const modalRef = useRef(null);

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="relative bg-white/80 border text-black rounded-full shadow-lg px-6 py-4 max-w-sm w-auto text-center"
      >
        <button
          onClick={onClose}
          className="absolute -bottom-10 right-2/5 w-6 h-6 bg-white border rounded-full flex items-center justify-center shadow hover:bg-gray-100 transition"
          aria-label="Close"
        >
          <Image src={cross} alt="close"/>
        </button>
        <h2 className="text-xl font-semibold">
          {isWin ? "恭喜中獎！" : "再試一次！"}
        </h2>
      </div>
    </div>
  );
}