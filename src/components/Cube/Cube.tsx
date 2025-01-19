import { OrbitControls } from "@react-three/drei";
import {
  BufferGeometry,
  Float32BufferAttribute,
  Uint16BufferAttribute,
} from "three";

const Cube = ({
  vertices,
  indices,
}: {
  vertices: number[];
  indices: number[];
}) => {
  const float32Vertices = new Float32Array([...vertices]);
  const uint16Indices = new Uint16Array([...indices]);

  const geometry = new BufferGeometry();
  geometry.setAttribute(
    "position",
    new Float32BufferAttribute(float32Vertices, 3),
  );
  geometry.setIndex(new Uint16BufferAttribute(uint16Indices, 1));

  return (
    <>
      <OrbitControls />
      <mesh geometry={geometry}>
        {/* <boxGeometry args={[width, height, depth]} /> // easy way to use react-three/fiber*/}
        <meshStandardMaterial color={"white"} flatShading={true} />
      </mesh>
    </>
  );
};

export default Cube;
