import Head from '@components/common/Head';
import { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import clsx from 'clsx';
import { Html } from '@react-three/drei';
import Loader from '@ui/Loader';
import { Bird, Island, Plane, Sky } from '@components/models';
import { Vector3 } from 'three';
import HomeInfo from '@components/home/HomeInfo';
import music from '@assets/sakura.mp3';
import { soundoff, soundon } from '@assets/icons';
import type { AnimationStageValues } from '@src/types/app';

export const Component = () => {
  const audioRef = useRef(new Audio(music));
  audioRef.current.volume = 1;
  audioRef.current.loop = true;
  const [currentStage, setCurrentStage] = useState<AnimationStageValues | null>(
    1,
  );
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (isPlayingMusic && audioElement != null) {
      audioElement.play();
    }

    return () => {
      audioElement.pause();
    };
  }, [isPlayingMusic]);

  const adjustIslandForScreenSize = () => {
    let screenScale: Vector3, screenPosition: Vector3;

    if (window.innerWidth < 768) {
      screenScale = new Vector3(0.8, 0.8, 0.8);
      screenPosition = new Vector3(0, -6.5, -53.4);
    } else {
      screenScale = new Vector3(1, 1, 1);
      screenPosition = new Vector3(0, -6.5, -43.4);
    }

    return [screenScale, screenPosition];
  };

  const adjustBiplaneForScreenSize = () => {
    let screenScale: Vector3, screenPosition: Vector3;

    // If screen width is less than 768px, adjust the scale and position
    if (window.innerWidth < 768) {
      screenScale = new Vector3(1.5, 1.5, 1.5);
      screenPosition = new Vector3(0, -1.5, 0);
    } else {
      screenScale = new Vector3(3, 3, 3);
      screenPosition = new Vector3(0, -1, -4);
    }

    return [screenScale, screenPosition];
  };

  const [islandScale, islandPosition] = adjustIslandForScreenSize();
  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();

  return (
    <>
      <Head title="Home" />
      <section className="relative h-screen w-full">
        <div className="absolute top-16 right-0 left-0 z-10 flex items-center justify-center">
          {currentStage && <HomeInfo currentStage={currentStage} />}
        </div>
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
            <Bird />
            <Sky isRotating={isRotating} />
            <Island
              isRotating={isRotating}
              setIsRotating={setIsRotating}
              setCurrentStage={setCurrentStage}
              position={islandPosition}
              rotation={[0.1, 4.7077, 0]}
              scale={islandScale}
            />
            <Plane
              isRotating={isRotating}
              position={biplanePosition}
              rotation={[0, Math.PI / 2, 0]}
              scale={biplaneScale}
            />
          </Suspense>
        </Canvas>

        <div className="absolute bottom-2 left-2">
          <img
            src={!isPlayingMusic ? soundoff : soundon}
            alt="jukebox"
            onClick={() => setIsPlayingMusic(!isPlayingMusic)}
            className="h-10 w-10 cursor-pointer object-contain"
          />
        </div>
      </section>
    </>
  );
};

Component.displayName = 'HomePage';
