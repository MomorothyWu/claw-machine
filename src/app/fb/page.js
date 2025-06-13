"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// 替換成你的 firebaseConfig
const firebaseConfig = {
  apiKey: "AIzaSyDv7q1pGeQP2Tupw_6NQxxiGfnU5LJAzjQ",
  authDomain: "nccu-204012.firebaseapp.com",
  projectId: "nccu-204012",
  appId: "1:371171216729:web:384fdc3b07872a25d99048",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function FBPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log("登入成功", result.user);

      // ✅ 登入成功後跳轉首頁
      router.push("/");
    } catch (error) {
      console.error("登入失敗", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Firebase Google 登入頁面</h1>
      {!user ? (
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          使用 Google 登入
        </button>
      ) : (
        <p>登入中...</p>
      )}
    </div>
  );
}

