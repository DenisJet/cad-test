import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";

const Cube = ({
  width,
  height,
  depth,
}: {
  width: string;
  height: string;
  depth: string;
}) => {
  const meshRef = useRef(null);

  return (
    <>
      <OrbitControls />
      <ambientLight />
      <mesh ref={meshRef}>
        <boxGeometry args={[Number(width), Number(height), Number(depth)]} />
        <meshStandardMaterial color={"white"} />
      </mesh>
    </>
  );
};

export default Cube;
