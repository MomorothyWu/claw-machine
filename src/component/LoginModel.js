"use client";

import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import googleicon from "@/../public/GoogleIcon.svg"

const firebaseConfig = {
  apiKey: "AIzaSyDv7q1pGeQP2Tupw_6NQxxiGfnU5LJAzjQ",
  authDomain: "nccu-204012.firebaseapp.com",
  projectId: "nccu-204012",
  appId: "1:371171216729:web:384fdc3b07872a25d99048",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function LoginModal({ onClose, onLoginSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, provider);
      onLoginSuccess(result.user);
      onClose();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      {/* 半透明遮罩 */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-white/50 z-40"
      ></div>

      {/* 登入視窗 */}
      <div className="fixed top-1/2 left-1/2 z-50 w-80 p-6 bg-white text-black rounded-lg shadow-lg -translate-x-1/2 -translate-y-1/2
      flex flex-col justify-center items-center">
        <h2 className="text-lg text-center font-semibold mb-4">請登入</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-auto px-6 py-2 border rounded-full hover:bg-black hover:text-white flex justify-between items-center gap-6"
        >
          <img src="/GoogleIcon.svg" alt="Google" className="w-8 h-8" />
          {loading ? "登入中..." : "使用 Google 登入"}
        </button>
      </div>
    </>
  );
}