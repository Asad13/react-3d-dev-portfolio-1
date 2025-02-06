import React, { useCallback } from 'react';
import { a } from '@react-spring/three';
import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree, type GroupProps } from '@react-three/fiber';
import IslandScene from '@assets/3d/island.glb';
import type { Group, BufferGeometry, Material } from 'three';
import { GLTF } from 'three/examples/jsm/Addons.js';
import type { AnimationStageValues } from '@src/types/app';

interface IslandProps extends GroupProps {
  isRotating: boolean;
  setIsRotating: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentStage: React.Dispatch<
    React.SetStateAction<AnimationStageValues | null>
  >;
}

// Extend the GLTF type to ensure proper typing for nodes & materials
type IslandGLTF = GLTF & {
  nodes: Record<string, { geometry: BufferGeometry }>;
  materials: Record<string, Material>;
};

const Island = ({
  isRotating,
  setIsRotating,
  setCurrentStage,
  ...props
}: IslandProps) => {
  const islandRef = useRef<Group>(null);
  // Get access to the js renderer and viewport
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(IslandScene) as unknown as IslandGLTF;

  const lastX = useRef<number>(0); // Use a ref for the last mouse x position
  const rotationSpeed = useRef<number>(0); // Use a ref for rotation speed
  const dampingFactor = 0.95; // Define a damping factor to control rotation damping

  const handleDragStart = useCallback(
    (e: PointerEvent | TouchEvent) => {
      e.stopPropagation();
      e.preventDefault();

      setIsRotating(true);
      const clientX =
        e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
      lastX.current = clientX;
    },
    [setIsRotating],
  );

  const handleDragEnd = useCallback(
    (e: PointerEvent | TouchEvent) => {
      e.stopPropagation();
      e.preventDefault();

      setIsRotating(false);
    },
    [setIsRotating],
  );

  const handleDrag = useCallback(
    (e: PointerEvent | TouchEvent) => {
      e.stopPropagation();
      e.preventDefault();

      if (isRotating) {
        const clientX =
          e instanceof TouchEvent ? e.touches[0].clientX : e.clientX; // If rotation is enabled, calculate the change in clientX position
        const delta = (clientX - lastX.current) / viewport.width; // calculate the change in the horizontal position of the mouse cursor or touch input, relative to the viewport's width
        if (islandRef.current != null) {
          islandRef.current.rotation.y += delta * 0.01 * Math.PI; // Update the island's rotation based on the mouse/touch movemen
          rotationSpeed.current = delta * 0.01 * Math.PI; // Update the rotation speed
        }
        lastX.current = clientX;
      }
    },
    [isRotating, viewport.width],
  );

  // Handle keydown events
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (islandRef.current != null) {
        if (!isRotating) setIsRotating(true);

        if (event.key === 'ArrowLeft') {
          islandRef.current.rotation.y += 0.005 * Math.PI;
          rotationSpeed.current = 0.007;
        } else if (event.key === 'ArrowRight') {
          islandRef.current.rotation.y -= 0.005 * Math.PI;
          rotationSpeed.current = -0.007;
        }
      }
    },
    [isRotating, setIsRotating],
  );

  // Handle keyup events
  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        setIsRotating(false);
      }
    },
    [setIsRotating],
  );

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handleDragStart);
    canvas.addEventListener('pointerup', handleDragEnd);
    canvas.addEventListener('pointermove', handleDrag);
    canvas.addEventListener('touchstart', handleDragStart);
    canvas.addEventListener('touchend', handleDragEnd);
    canvas.addEventListener('touchmove', handleDragStart);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      canvas.removeEventListener('pointerdown', handleDragStart);
      canvas.removeEventListener('pointerup', handleDragEnd);
      canvas.removeEventListener('pointermove', handleDrag);
      canvas.removeEventListener('touchstart', handleDragStart);
      canvas.removeEventListener('touchend', handleDragEnd);
      canvas.removeEventListener('touchmove', handleDrag);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [
    gl,
    handleDragStart,
    handleDragEnd,
    handleDrag,
    handleKeyDown,
    handleKeyUp,
  ]);

  // This function is called on each frame update
  useFrame(() => {
    if (islandRef.current != null) {
      // If not rotating, apply damping to slow down the rotation (smoothly)
      if (!isRotating) {
        // Apply damping factor
        rotationSpeed.current *= dampingFactor;

        // Stop rotation when speed is very small
        if (Math.abs(rotationSpeed.current) < 0.001) {
          rotationSpeed.current = 0;
        }

        islandRef.current.rotation.y += rotationSpeed.current;
      } else {
        // When rotating, determine the current stage based on island's orientation
        const rotation = islandRef.current.rotation.y;

        /**
         * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
         * The goal is to ensure that the rotation value remains within a specific range to
         * prevent potential issues with very large or negative rotation values.
         *  Here's a step-by-step explanation of what this code does:
         *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
         *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
         *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
         *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
         *     This is done to ensure that the value remains positive and within the range of
         *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
         *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
         *     modulo operation to the value obtained in step 2. This step guarantees that the value
         *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
         *     circle in radians.
         */
        const normalizedRotation =
          ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

        // Set the current stage based on the island's orientation
        switch (true) {
          case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
            setCurrentStage(4);
            break;
          case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
            setCurrentStage(3);
            break;
          case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
            setCurrentStage(2);
            break;
          case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
            setCurrentStage(1);
            break;
          default:
            setCurrentStage(null);
        }
      }
    }
  });
  return (
    <a.group ref={islandRef} {...props}>
      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface945_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface946_tree2_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface947_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface948_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface949_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.pCube11_rocks1_0.geometry}
        material={materials.PaletteMaterial001}
      />
    </a.group>
  );
};

export default Island;
