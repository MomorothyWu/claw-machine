"use client"
import { Canvas, useFrame } from "@react-three/fiber";
import { CameraControls, Environment, useGLTF, ContactShadows, KeyboardControls } from "@react-three/drei";
import { Suspense, useState, useRef, useEffect } from "react";
import ClawCamera from "@/component/ClawCamera";
import LoginModal from "@/component/LoginModel";
import WinPopup from "@/component/WinPopup";
import ExpandableCard from "@/component/ExpandableCard";
import WinCounter from "@/component/WinCounter";

function ClawModel({clawPos, isClawDown, isWin}){
  const clawModel = useGLTF(`claw.glb`);
  const clawRef = useRef();

  useFrame(()=>{
    if(clawRef.current){
      clawRef.current.traverse((child)=>{

        if(child.name == "claw"){
          child.position.set(clawPos.x, clawPos.y + 2.85, clawPos.z);
        }
        if(child.name == "clawBase"){
          child.position.set(clawPos.x, 2.85, clawPos.z);
        }
        if(child.name == "track"){
          child.position.set(0, 2.85, clawPos.z);
        }

        // 控制熊熊是否顯示
        if (child.name === "bear") {
        child.visible = isWin === true;
        }
      });
    }
  });

  return (
    <primitive
      ref={clawRef}
      object={clawModel.scene}
      scale={[0.6, 0.6, 0.6]}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

export default function Home() {
  const counterRef = useRef();
  const [clawPos, setClawPos] = useState({x: 0, y: 0, z: 0});
  const [isClawDown, setIsClawDown] = useState(false);
  const [isWin, setIsWin] = useState(null); // null=未抽, true/false=結果
  const [showPopup, setShowPopup] = useState(false);
  

  useEffect(() => {
    if (isWin !== null) {
      setShowPopup(true);

      if (isWin && counterRef.current) {
        counterRef.current.increment();
      }
    }
  }, [isWin]);  
  

  // 登入相關狀態
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);  // 一開始就顯示登入視窗

  return (
    <div className="w-full h-screen relative">

      {/* 如果尚未登入，顯示登入視窗 */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLoginSuccess={(user) => {
            setUser(user);
            setShowLogin(false);
          }}
        />
      )}

      {showPopup && (
        <WinPopup
          isWin={isWin}
          onClose={() => {
            setShowPopup(false);
            setIsWin(null);
          }}
        />
      )}

      {/* 登入成功後顯示歡迎訊息 */}
      {user && (
        <div className="absolute top-4 left-4 z-50 border bg-white/20 rounded-full px-6 py-2 text-black font-semibold">
          歡迎，{user.displayName}！
        </div>
      )}

      <WinCounter ref={counterRef} />

      <ExpandableCard />

      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "w", "W"] },
          { name: "backward", keys: ["ArrowDown", "s", "S"] },
          { name: "left", keys: ["ArrowLeft", "a", "A"] },
          { name: "right", keys: ["ArrowRight", "d", "D"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

          <Suspense fallback={null}>
            <ClawModel clawPos={clawPos} isClawDown={isClawDown} isWin={isWin}/>
          </Suspense>

          <Environment
            background={true}
            backgroundBlurriness={0.5}
            backgroundIntensity={1}
            environmentIntensity={1}
            preset={'city'}
          />

          <ContactShadows opacity={1} scale={10} blur={10} far={10} resolution={256} color="#DDDDDD" />

          <ClawCamera
            clawPos={clawPos}
            setClawPos={setClawPos}
            isClawDown={isClawDown}
            setIsClawDown={setIsClawDown}
            setIsWin={setIsWin}
          />
          <CameraControls />
        </Canvas>
      </KeyboardControls>
    </div>
  );
}
