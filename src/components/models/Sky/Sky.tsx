import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';
import SkyScene from '@assets/3d/sky.glb';

const Sky = ({ isRotating }: { isRotating: boolean }) => {
  const skyRef = useRef<Mesh>(null);
  const { scene } = useGLTF(SkyScene);

  // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.
  // It ensures smooth animations by making the rotation frame rate-independent.
  // 'delta' represents the time in seconds since the last frame.
  useFrame((_, delta) => {
    if (isRotating && skyRef.current != null) {
      skyRef.current.rotation.y += 0.25 * delta; // Adjust the rotation speed as needed
    }
  });

  return (
    <mesh ref={skyRef}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Sky;
