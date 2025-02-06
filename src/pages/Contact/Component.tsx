import Head from '@components/common/Head';
import { Suspense, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import clsx from 'clsx';
import emailjs from '@emailjs/browser';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Fox } from '@components/models';
import Alert from '@components/utils/Alert';
import useAlert from '@hooks/useAlert';
import Loader from '@ui/Loader';
import type { FormEvent } from 'react';

export const Component = () => {
  const navigate = useNavigate();
  const { alert, showAlert, hideAlert } = useAlert();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState<'idle' | 'walk'>(
    'idle',
  );

  const handleFocus = () => setCurrentAnimation('walk');
  const handleBlur = () => setCurrentAnimation('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formRef.current != null) {
      emailjs
        .sendForm(
          import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
          formRef.current,
          import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
        )
        .then(
          () => {
            setLoading(false);
            showAlert({
              text: 'Thank you for your message 😃',
              type: 'success',
            });
            setCurrentAnimation('idle');

            setTimeout(() => {
              hideAlert();
              navigate(0);
            }, 3000);
          },
          (error) => {
            setLoading(false);
            console.error(error);
            setCurrentAnimation('idle');
            showAlert({
              text: "I didn't receive your message 😢",
              type: 'danger',
            });

            setTimeout(() => {
              hideAlert();
            }, 3000);
          },
        );
    }
  };

  return (
    <>
      <Head title="Contact" />
      <section className="max-container relative flex flex-col lg:flex-row">
        {alert.show && <Alert type={alert.type} text={alert.text} />}
        <div className="flex min-w-[50%] flex-1 flex-col">
          <h1 className="head-text">Get in Touch</h1>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-14 flex w-full flex-col gap-7"
          >
            <label className="text-black-500 font-semibold">
              Name
              <input
                type="text"
                name="user_name"
                className="input"
                placeholder="John"
                required
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <label className="text-black-500 font-semibold">
              Email
              <input
                type="email"
                name="user_email"
                className="input"
                placeholder="John@gmail.com"
                required
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <label className="text-black-500 font-semibold">
              Your Message
              <textarea
                name="message"
                rows={4}
                className="textarea"
                placeholder="Write your thoughts here..."
                required
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className={clsx('btn', {
                'cursor-pointer': !loading,
                'cursor-not-allowed': loading,
              })}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </form>
        </div>
        <div className="h-[350px] w-full md:h-[550px] lg:h-auto lg:w-1/2">
          <Canvas
            camera={{
              position: [0, 0, 5],
              fov: 75,
              near: 0.1,
              far: 1000,
            }}
          >
            <directionalLight position={[0, 0, 1]} intensity={2.5} />
            <ambientLight intensity={1} />
            <pointLight position={[5, 10, 0]} intensity={2} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={2}
            />

            <Suspense
              fallback={
                <Html>
                  <Loader />
                </Html>
              }
            >
              <Fox
                currentAnimation={currentAnimation}
                position={[0.5, 0.35, 0]}
                rotation={[12.629, -0.6, 0]}
                scale={[0.5, 0.5, 0.5]}
              />
            </Suspense>
          </Canvas>
        </div>
      </section>
    </>
  );
};

Component.displayName = 'ContactPage';
