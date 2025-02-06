import { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import PlaneScene from '@assets/3d/plane.glb';
import type { MeshProps } from '@react-three/fiber';
import type { Mesh } from 'three';

interface PlanProps extends MeshProps {
  isRotating: boolean;
}
const Plane = ({ isRotating, ...props }: PlanProps) => {
  const planeRef = useRef<Mesh>(null);
  // Load the 3D model and its animations
  const { scene, animations } = useGLTF(PlaneScene);
  // Get animation actions associated with the plane
  const { actions } = useAnimations(animations, planeRef);

  // Use an effect to control the plane's animation based on 'isRotating'
  // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.
  useEffect(() => {
    if (actions['Take 001'] != null) {
      if (isRotating) {
        actions['Take 001'].play();
      } else {
        actions['Take 001'].stop();
      }
    }
  }, [actions, isRotating]);
  return (
    <mesh ref={planeRef} {...props}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Plane;
