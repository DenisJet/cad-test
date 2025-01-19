import { OrbitControls } from "@react-three/drei";
import {
  BufferGeometry,
  Float32BufferAttribute,
  Uint16BufferAttribute,
} from "three";

const Cube = ({
  width,
  height,
  depth,
}: {
  width: string;
  height: string;
  depth: string;
}) => {
  const w = Number(width) || 1;
  const h = Number(height) || 1;
  const d = Number(depth) || 1;

  const vertices = new Float32Array([
    -w / 2,
    -h / 2,
    d / 2,
    w / 2,
    -h / 2,
    d / 2,
    w / 2,
    h / 2,
    d / 2,
    -w / 2,
    h / 2,
    d / 2,
    -w / 2,
    -h / 2,
    -d / 2,
    w / 2,
    -h / 2,
    -d / 2,
    w / 2,
    h / 2,
    -d / 2,
    -w / 2,
    h / 2,
    -d / 2,
  ]);

  const indices = new Uint16Array([
    0, 1, 2, 0, 2, 3,

    4, 6, 5, 4, 7, 6,

    0, 4, 5, 0, 5, 1,

    1, 5, 6, 1, 6, 2,

    3, 2, 6, 3, 6, 7,

    0, 3, 7, 0, 7, 4,
  ]);

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
  geometry.setIndex(new Uint16BufferAttribute(indices, 1));

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
