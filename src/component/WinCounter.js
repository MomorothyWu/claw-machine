"use client"
import { useState, forwardRef, useImperativeHandle } from "react";

// 用 forwardRef 暴露內部方法給父層呼叫
const WinCounter = forwardRef((props, ref) => {
  const [count, setCount] = useState(0);

  useImperativeHandle(ref, () => ({
    increment() {
      setCount((prev) => prev + 1);
    },
    reset() {
      setCount(0);
    }
  }));

  return (
    <div className="absolute top-4 right-4 z-50 border bg-white/20 rounded-full px-4 py-2 text-black font-semibold shadow-md">
      中獎次數：{count}
    </div>
  );
});

export default WinCounter;