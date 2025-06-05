import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, useKeyboardControls } from "@react-three/drei";
import gasp from "gsap";

function ClawCamera({clawPos, setClawPos}){
    const camRef = useRef();

    const [, getKeys] = useKeyboardControls();


    const speed = 0.01;
    const limitX = 0.4;
    const limitY = 0.4;
    

    useFrame(()=>{
        const { forward, backward, left, right, jump } = getKeys();

        if (!isClawDown){
          if(forward){
          if(clawPos.z < limitY){
            setClawPos({x:clawPos.x, y:clawPos.y, z:clawPos.z - speed});
          }
        }

        if(backward){
          if(clawPos.z > -limitY){
            setClawPos({x:clawPos.x, y:clawPos.y, z:clawPos.z + speed});
          }
        }

        if(right){
          if(clawPos.x < limitX){
            setClawPos({x:clawPos.x + speed, y:clawPos.y, z:clawPos.z});
          }
        }

        if(left){
          if(clawPos.z > -limitX){
            setClawPos({x:clawPos.x - speed, y:clawPos.y, z:clawPos.z});
          }
        }


        if(jump){
            console.log("JUMPPP!");
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