import Head from '@components/common/Head';
import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import clsx from 'clsx';
import { Html } from '@react-three/drei';
import Loader from '@ui/Loader';
import { Island, Sky } from '@components/models';

export const Component = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState<boolean>(false);

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43.4];
    }

    return [screenScale, screenPosition];
  };

  const [islandScale, islandPosition] = adjustIslandForScreenSize();

  return (
    <>
      <Head title="Home" />
      <section className="relative h-screen w-full">
        <Canvas
          className={clsx('h-screen w-full bg-transparent', {
            'cursor-grabbing': isRotating,
            'cursor-grab': !isRotating,
          })}
          camera={{ near: 0.1, far: 1000 }}
        >
          <Suspense
            fallback={
              <Html>
                <Loader />
              </Html>
            }
          >
            <directionalLight position={[1, 1, 1]} intensity={2} />
            <ambientLight intensity={0.5} />
            <hemisphereLight
              color="#b1e1ff"
              groundColor="#000000"
              intensity={1}
            />
            <Sky />
            <Island
              isRotating={isRotating}
              setIsRotating={setIsRotating}
              setCurrentStage={setCurrentStage}
              position={islandPosition}
              rotation={[0.1, 4.7077, 0]}
              scale={islandScale}
            />
          </Suspense>
        </Canvas>
      </section>
    </>
  );
};

Component.displayName = 'HomePage';
