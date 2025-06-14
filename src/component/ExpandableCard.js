"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import w from "@/../public/KeyW.svg";
import s from "@/../public/KeyS.svg";
import a from "@/../public/KeyA.svg";
import d from "@/../public/KeyD.svg";
import F from "@/../public/Forward.svg";
import B from "@/../public/Backward.svg";
import L from "@/../public/Left.svg";
import R from "@/../public/Right.svg";
import space from "@/../public/Space.svg";

export default function ExpandableCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 展開前：小圓形按鈕 */}
      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="shadow-lg bg-white border-2 border-[#F56C56] rounded-full text-[#F56C56] font-medium
          flex items-center justify-center px-4 py-2 hover:scale-105 transition"
        >
          <div>遊戲說明</div>
          <Image src="plus.svg" alt="open" width={32} height={32} />
        </button>
      )}

      {/* 展開後：卡片 */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="w-auto h-auto bg-white rounded-2xl shadow-xl p-4 relative flex flex-col justify-between gap-2"
          >
            <div className="text-black flex flex-col gap-2">
              <div className="flex justify-baseline items-center gap-1">
                <Image src={w} alt="w"/>
                <Image src={F} alt="f"/>
                <p className="ml-2">向前移動爪子</p>
              </div>

              <div className="flex justify-baseline items-center gap-1">
                <Image src={s} alt="s"/>
                <Image src={B} alt="b"/>
                <p className="ml-2">向後移動爪子</p>
              </div>

              <div className="flex justify-baseline items-center gap-1">
                <Image src={a} alt="a"/>
                <Image src={L} alt="l"/>
                <p className="ml-2">向左移動爪子</p>
              </div>

              <div className="flex justify-baseline items-center gap-1">
                <Image src={d} alt="d"/>
                <Image src={R} alt="r"/>
                <p className="ml-2">向右移動爪子</p>
              </div>

              <div className="flex justify-baseline items-center gap-1">
                <Image src={space} alt="space"/>
                <p className="ml-2">下爪！</p>
              </div>

            </div>

            <div className="flex justify-start mt-4">
              <button
                onClick={() => setExpanded(false)}
                className="rounded-full hover:scale-105 transition"
              >
                <Image src="Back.svg" alt="back" width={36} height={36} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
