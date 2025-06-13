import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, useKeyboardControls } from "@react-three/drei";
import gsap from "gsap";


function ClawCamera({clawPos, setClawPos, isClawDown, setIsClawDown, setIsWin }){
    const camRef = useRef();

    const [, getKeys] = useKeyboardControls();


    const speed = 0.05;
    const limitX = 0.4;
    const limitY = 0.4;
    

    useFrame(()=>{
        const { forward, backward, left, right, jump } = getKeys();

        if(!isClawDown){
            if(forward){
                if(clawPos.z > -limitY){
                    setClawPos({x:clawPos.x, y:clawPos.y, z:clawPos.z - speed});
                }
            }
    
            if(backward){
                if(clawPos.z < limitY){
                    setClawPos({x:clawPos.x, y:clawPos.y, z:clawPos.z + speed});
                }
            }
    
            if(right){
                if(clawPos.x < limitX){
                    setClawPos({x:clawPos.x + speed, y:clawPos.y, z:clawPos.z});
                }
            }
    
            if(left){
              if(clawPos.x > -limitX){
                  setClawPos({x:clawPos.x - speed, y:clawPos.y, z:clawPos.z});
              }
            }
    
            if(jump){
              // 隨機變數判斷是否中獎
              const random = Math.random();
              const win = random < 0.5;

              setIsClawDown(true);
              gsap.to(clawPos, {
                y: -0.7,
                duration: 3,
                onComplete: () => {
                
                  gsap.to(clawPos, {
                    y: 0.3,
                    duration: 2,
                    onComplete: () => {
                      setIsClawDown(false);
                      setIsWin(win); // <-- 設定結果讓主畫面顯示用
                    },
                  });
                },
              });
            }

        }

        if(camRef.current){
            camRef.current.lookAt(0, 1, 0);
        }
    });

    return(<>
        <PerspectiveCamera
          ref={camRef}
          makeDefault
          position={[0, 1, 3]} // 3 ~ 6
        />
    </>)
}

export default ClawCamera;