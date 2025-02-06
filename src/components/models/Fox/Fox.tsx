import { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import FoxScene from '@assets/3d/fox.glb';
import type { GroupProps } from '@react-three/fiber';
import type { Group, BufferGeometry, Material, Skeleton } from 'three';
import { GLTF } from 'three/examples/jsm/Addons.js';

interface FoxProps extends GroupProps {
  currentAnimation: 'idle' | 'walk' | 'hit';
}

type FoxGLTF = GLTF & {
  nodes: Record<string, { geometry: BufferGeometry; skeleton: Skeleton }>;
  materials: Record<string, Material>;
};

const Fox = ({ currentAnimation, ...props }: FoxProps) => {
  const foxRef = useRef<Group>(null);
  // Load the 3D model and its animations
  const { nodes, materials, animations } = useGLTF(
    FoxScene,
  ) as unknown as FoxGLTF;
  // Get animation actions associated with the fox
  const { actions } = useAnimations(animations, foxRef);

  // This effect will run whenever the currentAnimation prop changes
  useEffect(() => {
    Object.values(actions).forEach((action) => {
      if (action != null) action.stop();
    });

    if (actions[currentAnimation]) {
      actions[currentAnimation].play();
    }
  }, [actions, currentAnimation]);

  return (
    <group ref={foxRef} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <primitive object={nodes.GLTF_created_0_rootJoint} />
        <skinnedMesh
          name="Object_7"
          geometry={nodes.Object_7.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_7.skeleton}
        />
        <skinnedMesh
          name="Object_8"
          geometry={nodes.Object_8.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_8.skeleton}
        />
        <skinnedMesh
          name="Object_9"
          geometry={nodes.Object_9.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_9.skeleton}
        />
        <skinnedMesh
          name="Object_10"
          geometry={nodes.Object_10.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_10.skeleton}
        />
        <skinnedMesh
          name="Object_11"
          geometry={nodes.Object_11.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_11.skeleton}
        />
      </group>
    </group>
  );
};

export default Fox;
